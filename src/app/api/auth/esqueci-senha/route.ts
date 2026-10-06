import { NextResponse } from 'next/server';
import { esqueciSenhaSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = esqueciSenhaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { sucesso: false, erros: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    // Rate limiting (RF01a: 1 solicitação a cada 2 minutos por e-mail e por IP)
    // Mensagem genérica mesmo se não existir usuário (prevenção de enumeração)
    return NextResponse.json({
      sucesso: true,
      mensagem: 'Se o e-mail existir, um link de recuperação será enviado em instantes',
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
