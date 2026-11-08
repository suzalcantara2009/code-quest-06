import { NextResponse } from 'next/server';
import { obterSessaoAtual } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessao = await obterSessaoAtual();
    if (!sessao) {
      return NextResponse.json({ autenticado: false, usuario: null });
    }
    return NextResponse.json({
      autenticado: true,
      usuario: {
        id: sessao.usuarioId,
        nome: sessao.nome,
        email: sessao.email,
        tipo: sessao.tipo,
      },
    });
  } catch (error) {
    return NextResponse.json({ autenticado: false, usuario: null });
  }
}

