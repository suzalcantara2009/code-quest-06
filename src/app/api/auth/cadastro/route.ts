import { NextResponse } from 'next/server';
import { cadastroSchema } from '@/lib/validations/auth';
import { prisma } from '@/lib/db';
import { hashSenha, criarSessao, SESSION_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cadastroSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { sucesso: false, erros: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { nome, email, senha } = parsed.data;
    const emailNormalizado = email.toLowerCase().trim();

    // Verificar se já existe usuário com este e-mail
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: emailNormalizado },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Já existe uma conta cadastrada com este e-mail.' },
        { status: 409 }
      );
    }

    // Gerar hash segura da senha com bcrypt (RNF01: custo >= 10)
    const senha_hash = await hashSenha(senha);

    // Persistir usuário no banco Postgres via Prisma
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: nome.trim(),
        email: emailNormalizado,
        senha_hash,
        email_verificado: true,
        termos_aceitos_em: new Date(),
        termos_versao: '1.0',
      },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        criado_em: true,
      },
    });

    // Iniciar sessão após o cadastro
    const sessionToken = await criarSessao(novoUsuario.id);

    const response = NextResponse.json(
      {
        sucesso: true,
        mensagem: 'Conta criada e persistida no banco com sucesso!',
        usuario: novoUsuario,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: error?.message || 'Erro interno ao realizar cadastro no banco de dados' },
      { status: 500 }
    );
  }
}
