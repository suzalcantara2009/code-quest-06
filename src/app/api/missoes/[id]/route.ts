import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { MISSOES_CATALOGO, MODULOS_NICHOS } from '@/data/missoes';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const missaoId = parseInt(params.id, 10);
    if (isNaN(missaoId)) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'ID da missão inválido' },
        { status: 400 }
      );
    }

    let missao = MISSOES_CATALOGO.find((m) => m.id === missaoId);

    try {
      const doBanco = await prisma.missao.findUnique({
        where: { id: missaoId },
        include: { modulo: true },
      });

      if (doBanco) {
        missao = {
          id: doBanco.id,
          modulo_id: doBanco.modulo_id,
          nicho: doBanco.modulo.titulo.replace(/Módulo \d+ — /, ''),
          tecnologia: doBanco.modulo.tecnologia,
          titulo: doBanco.titulo,
          enunciado: doBanco.enunciado,
          codigo_inicial: doBanco.codigo_inicial || missao?.codigo_inicial || '',
          criterio_aceite: doBanco.criterio_aceite,
          dica: missao?.dica || 'Consulte a documentação e siga as regras do desafio.',
          dificuldade: (doBanco.dificuldade as 'facil' | 'medio' | 'dificil') || 'facil',
          xp: missao?.xp || 20,
        };
      }
    } catch (err) {
      console.warn('Falha ao consultar missão específica do banco, usando catálogo:', err);
    }

    if (!missao) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Missão não encontrada' },
        { status: 404 }
      );
    }

    const modulo = MODULOS_NICHOS.find((m) => m.id === missao!.modulo_id);

    return NextResponse.json({
      sucesso: true,
      dados: {
        missao,
        modulo,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar missão:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao consultar missão' },
      { status: 500 }
    );
  }
}

