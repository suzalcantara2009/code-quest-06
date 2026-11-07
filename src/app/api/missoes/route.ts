import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { MISSOES_CATALOGO, MODULOS_NICHOS } from '@/data/missoes';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const moduloIdParam = searchParams.get('modulo_id');
    const dificuldadeParam = searchParams.get('dificuldade');
    const buscaParam = searchParams.get('busca')?.toLowerCase().trim();

    let itens = [...MISSOES_CATALOGO];

    // Tentar enriquecer ou consultar do banco relacional PostgreSQL se houver dados
    try {
      const missoesBanco = await prisma.missao.findMany({
        include: { modulo: true },
        orderBy: { id: 'asc' },
      });

      if (missoesBanco && missoesBanco.length > 0) {
        itens = missoesBanco.map((m) => {
          const catalogoItem = MISSOES_CATALOGO.find((c) => c.id === m.id);
          return {
            id: m.id,
            modulo_id: m.modulo_id,
            nicho: m.modulo.titulo.replace(/Módulo \d+ — /, ''),
            tecnologia: m.modulo.tecnologia,
            titulo: m.titulo,
            enunciado: m.enunciado,
            codigo_inicial: m.codigo_inicial || catalogoItem?.codigo_inicial || '',
            criterio_aceite: m.criterio_aceite,
            dica: catalogoItem?.dica || 'Consulte os conceitos teóricos do módulo para solucionar este desafio.',
            dificuldade: (m.dificuldade as 'facil' | 'medio' | 'dificil') || 'facil',
            xp: catalogoItem?.xp || (m.dificuldade === 'facil' ? 15 : m.dificuldade === 'medio' ? 25 : 35),
          };
        });
      }
    } catch (dbError) {
      // Em caso de falha de conexão temporária, prossegue com os dados locais garantidos
      console.warn('Banco offline ou tabelas vazias; utilizando catálogo em memória:', dbError);
    }

    // Filtros
    if (moduloIdParam) {
      const modId = parseInt(moduloIdParam, 10);
      if (!isNaN(modId)) {
        itens = itens.filter((m) => m.modulo_id === modId);
      }
    }

    if (dificuldadeParam) {
      itens = itens.filter((m) => m.dificuldade.toLowerCase() === dificuldadeParam.toLowerCase());
    }

    if (buscaParam) {
      itens = itens.filter(
        (m) =>
          m.titulo.toLowerCase().includes(buscaParam) ||
          m.enunciado.toLowerCase().includes(buscaParam) ||
          m.nicho.toLowerCase().includes(buscaParam)
      );
    }

    return NextResponse.json({
      sucesso: true,
      dados: {
        itens,
        total: itens.length,
        modulos: MODULOS_NICHOS,
      },
    });
  } catch (error) {
    console.error('Erro ao listar missões:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao consultar missões' },
      { status: 500 }
    );
  }
}

