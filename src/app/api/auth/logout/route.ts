import { NextResponse } from 'next/server';

export async function POST() {
  // Estrutura de logout (RF01e)
  return NextResponse.json({
    sucesso: true,
    mensagem: 'Sessão encerrada com sucesso',
  });
}
