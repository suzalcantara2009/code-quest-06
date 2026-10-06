import { NextResponse } from 'next/server';
import { cadastroSchema } from '@/lib/validations/auth';

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

    // Estrutura de cadastro - Lógica de negócio a ser implementada na próxima etapa
    return NextResponse.json(
      {
        sucesso: true,
        mensagem: 'Conta cadastrada com sucesso. Verifique seu e-mail.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
