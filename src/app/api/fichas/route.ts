import { NextResponse } from 'next/server';
import { fichaSchema } from '@/lib/validations/ficha';

export async function GET(request: Request) {
  // Estrutura de listagem paginada (RF07) e busca combinada (RF08)
  return NextResponse.json({
    sucesso: true,
    dados: {
      itens: [],
      pagina_atual: 1,
      total_paginas: 0,
      total_itens: 0,
      limite: 10,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = fichaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { sucesso: false, erros: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    // Estrutura de criação de ficha (RF02, RF03, RN01, RN02, RN06)
    return NextResponse.json(
      {
        sucesso: true,
        mensagem: 'Ficha de personagem criada com sucesso',
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
