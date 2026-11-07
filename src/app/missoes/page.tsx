'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target,
  Filter,
  Search,
  Sparkles,
  Blocks,
  Code,
  FileCode,
  Layers,
  CheckCircle2,
  ArrowRight,
  Trophy,
  BookOpen,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { MISSOES_CATALOGO, MODULOS_NICHOS, MissaoCompleta } from '@/data/missoes';

export default function MissoesPage() {
  const [dificuldade, setDificuldade] = useState<string>('');
  const [nichoSelecionado, setNichoSelecionado] = useState<number | null>(null);
  const [busca, setBusca] = useState<string>('');
  const [missoesConcluidas, setMissoesConcluidas] = useState<number[]>([]);
  const [missoes, setMissoes] = useState<MissaoCompleta[]>(MISSOES_CATALOGO);

  useEffect(() => {
    // Carregar progresso salvo no localStorage
    try {
      const salvas = localStorage.getItem('codequest_missoes_concluidas');
      if (salvas) {
        setMissoesConcluidas(JSON.parse(salvas));
      }
    } catch (e) {
      // Ignora erro de storage
    }

    // Tentar buscar da API para garantir dados atualizados
    fetch('/api/missoes')
      .then((res) => res.json())
      .then((data) => {
        if (data.sucesso && data.dados?.itens) {
          setMissoes(data.dados.itens);
        }
      })
      .catch(() => {
        // Usa o catálogo local em caso de falha de rede
      });
  }, []);

  // Filtragem combinada
  const missoesFiltradas = missoes.filter((m) => {
    const matchDificuldade = !dificuldade || m.dificuldade.toLowerCase() === dificuldade.toLowerCase();
    const matchNicho = nichoSelecionado === null || m.modulo_id === nichoSelecionado;
    const matchBusca =
      !busca ||
      m.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      m.enunciado.toLowerCase().includes(busca.toLowerCase()) ||
      m.nicho.toLowerCase().includes(busca.toLowerCase());

    return matchDificuldade && matchNicho && matchBusca;
  });

  const getIconeNicho = (moduloId: number) => {
    switch (moduloId) {
      case 1:
        return <Blocks className="w-4 h-4 text-purple-400" />;
      case 2:
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 3:
        return <FileCode className="w-4 h-4 text-emerald-400" />;
      case 4:
        return <Layers className="w-4 h-4 text-amber-400" />;
      default:
        return <Target className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getBadgeDificuldade = (dif: string) => {
    switch (dif) {
      case 'facil':
        return <Badge variant="cyan">Fácil</Badge>;
      case 'medio':
        return <Badge variant="warning">Médio</Badge>;
      case 'dificil':
        return <Badge variant="danger">Difícil</Badge>;
      default:
        return <Badge>{dif}</Badge>;
    }
  };

  const totalXpDisponivel = missoes.reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>4 Nichos da Trilha Pedagógica</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Catálogo de Missões</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Desafios práticos divididos nos 4 nichos essenciais da programação: Blocos, Python, HTML/CSS e JavaScript. Resolva para acumular XP e forjar seu poder.
          </p>
        </div>

        {/* Resumo de XP e Conclusões */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-quest-border shadow-lg self-start sm:self-auto">
          <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-900/60">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Progresso de Conclusões</div>
            <div className="text-sm font-bold text-white">
              <span className="text-emerald-400">{missoesConcluidas.length}</span> / {missoes.length} Missões ({totalXpDisponivel} XP total)
            </div>
          </div>
        </div>
      </div>

      {/* Seletor Rápido de Nichos (Tabs) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        <button
          onClick={() => setNichoSelecionado(null)}
          className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition border ${
            nichoSelecionado === null
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-300 border-quest-border hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Todos ({missoes.length})</span>
        </button>

        {MODULOS_NICHOS.map((n) => {
          const ativo = nichoSelecionado === n.id;
          const qtdNicho = missoes.filter((m) => m.modulo_id === n.id).length;
          return (
            <button
              key={n.id}
              onClick={() => setNichoSelecionado(n.id)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition border ${
                ativo
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-quest-border hover:bg-slate-800 hover:text-white'
              }`}
            >
              {getIconeNicho(n.id)}
              <span className="truncate">{n.nicho} ({qtdNicho})</span>
            </button>
          );
        })}
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-900/60 p-4 rounded-xl border border-quest-border shadow-md">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título, conceito ou tecnologia..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={dificuldade}
            onChange={(e) => setDificuldade(e.target.value)}
            className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="">Todas as Dificuldades</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
      </div>

      {/* Grid de Missões */}
      {missoesFiltradas.length === 0 ? (
        <div className="flex-1">
          <EmptyState
            icone={<Target className="w-12 h-12" />}
            titulo="Nenhuma missão encontrada"
            descricao="Nenhuma missão corresponde aos filtros de busca e dificuldade selecionados."
            acao={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDificuldade('');
                  setNichoSelecionado(null);
                  setBusca('');
                }}
              >
                Limpar Todos os Filtros
              </Button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {missoesFiltradas.map((missao) => {
            const concluida = missoesConcluidas.includes(missao.id);
            return (
              <Card
                key={missao.id}
                className={`flex flex-col justify-between hover:border-indigo-500/60 transition duration-200 group relative overflow-hidden ${
                  concluida ? 'border-emerald-500/40 bg-slate-900/90' : 'bg-slate-900/60'
                }`}
              >
                {/* Faixa sutil se concluída */}
                {concluida && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    Concluída
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      {getIconeNicho(missao.modulo_id)}
                      <span className="font-medium text-slate-300">{missao.nicho}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {getBadgeDificuldade(missao.dificuldade)}
                    </div>
                  </div>

                  <CardTitle className="text-base group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {missao.titulo}
                  </CardTitle>

                  <CardDescription className="text-xs line-clamp-3 mt-1.5 text-slate-400">
                    {missao.enunciado}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 pb-4">
                  <div className="pt-3 border-t border-quest-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      +{missao.xp} XP
                    </span>

                    <Link href={`/missoes/${missao.id}`}>
                      <Button
                        size="sm"
                        variant={concluida ? 'outline' : 'primary'}
                        className="text-xs py-1.5 px-3 h-8 gap-1.5"
                      >
                        <span>{concluida ? 'Revisar' : 'Iniciar Desafio'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
