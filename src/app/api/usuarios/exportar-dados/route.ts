import { NextResponse } from 'next/server';

export async function GET() {
  // RF21a: Exportação dos próprios dados pessoais em formato legível (JSON - LGPD)
  return NextResponse.json({
    sucesso: true,
    dados: {
      usuario: null,
      fichas: [],
      missoes_concluidas: [],
      data_exportacao: new Date().toISOString(),
    },
  });
}
