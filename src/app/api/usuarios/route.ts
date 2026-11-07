import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        email_verificado: true,
        criado_em: true,
        _count: {
          select: {
            fichas: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return NextResponse.json({
      sucesso: true,
      dados: {
        total: usuarios.length,
        usuarios,
      },
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao consultar usuários cadastrados' },
      { status: 500 }
    );
  }
}

