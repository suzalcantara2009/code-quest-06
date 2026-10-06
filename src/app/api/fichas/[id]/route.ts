import { NextResponse } from 'next/server';
import { fichaSchema } from '@/lib/validations/ficha';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  // Estrutura de busca da ficha por ID
  return NextResponse.json({
    sucesso: true,
    dados: null,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const parsed = fichaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { sucesso: false, erros: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    // Estrutura de edição da ficha
    return NextResponse.json({
      sucesso: true,
      mensagem: 'Ficha atualizada com sucesso',
    });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  // Estrutura de arquivamento (exclusão lógica ativo = false, RF05, RN03)
  return NextResponse.json({
    sucesso: true,
    mensagem: 'Ficha arquivada com sucesso',
  });
}
