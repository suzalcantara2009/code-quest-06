import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';

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

    // Estrutura de login - Lógica de negócio a ser implementada na próxima etapa
    return NextResponse.json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
