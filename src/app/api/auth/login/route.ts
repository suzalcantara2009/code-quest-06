import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { prisma } from '@/lib/db';
import { verificarSenha, criarSessao, SESSION_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { sucesso: false, erros: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { email, senha } = parsed.data;
    const emailNormalizado = email.toLowerCase().trim();

    // Buscar usuário pelo e-mail no PostgreSQL via Prisma
    const usuario = await prisma.usuario.findUnique({
      where: { email: emailNormalizado },
    });

    // Se o usuário não existe no banco, rejeita o acesso
    if (!usuario) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'E-mail ou senha incorretos.' },
        { status: 401 }
      );
    }

    // Verificar se a conta está temporariamente bloqueada (RF01a - 5 tentativas falhas)
    if (usuario.bloqueado_ate && new Date() < usuario.bloqueado_ate) {
      const minutosRestantes = Math.ceil(
        (usuario.bloqueado_ate.getTime() - Date.now()) / (1000 * 60)
      );
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: `Conta bloqueada temporariamente após múltiplas tentativas incorretas. Tente novamente em ${minutosRestantes} minuto(s).`,
        },
        { status: 403 }
      );
    }

    // Se o usuário não possui senha configurada (ex.: criado exclusivamente via GitHub OAuth)
    if (!usuario.senha_hash) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: 'Esta conta foi criada via login social do GitHub. Por favor, utilize a autenticação pelo GitHub.',
        },
        { status: 401 }
      );
    }

    // Validação estrita e obrigatória da hash da senha com bcrypt (RNF01)
    const senhaValida = await verificarSenha(senha, usuario.senha_hash);

    if (!senhaValida) {
      const novasTentativas = (usuario.tentativas_login || 0) + 1;
      const deveBloquear = novasTentativas >= 5;

      await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
          tentativas_login: novasTentativas,
          bloqueado_ate: deveBloquear
            ? new Date(Date.now() + 15 * 60 * 1000) // Bloqueio temporário de 15 minutos (RF01a)
            : null,
        },
      });

      return NextResponse.json(
        {
          sucesso: false,
          mensagem: deveBloquear
            ? 'Limite de 5 tentativas excedido. A conta foi bloqueada temporariamente por 15 minutos para sua segurança.'
            : 'E-mail ou senha incorretos.',
        },
        { status: 401 }
      );
    }

    // Se a senha foi validada com sucesso, zera o contador de tentativas e o bloqueio
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        tentativas_login: 0,
        bloqueado_ate: null,
      },
    });

    // Cria a sessão persistida no banco Postgres (tabela sessoes - RF01e)
    const sessionToken = await criarSessao(usuario.id);

    // Configura cookie HTTP seguro (HttpOnly, Secure, SameSite=Strict - RF01a)
    const response = NextResponse.json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 dias de validade
    });

    return response;
  } catch (error) {
    console.error('Erro na autenticação de login:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao processar a autenticação' },
      { status: 500 }
    );
  }
}
