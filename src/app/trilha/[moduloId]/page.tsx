'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Target,
  Sparkles,
  ArrowRight,
  Blocks,
  Code,
  FileCode,
  Layers,
  GraduationCap,
  Puzzle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MODULOS_NICHOS, MISSOES_CATALOGO } from '@/data/missoes';
import { AulasBlocos } from '@/components/blocos/AulasBlocos';
import { ScratchBlockEditor } from '@/components/blocos/ScratchBlockEditor';

export default function ModuloDetalhesPage({ params }: { params: { moduloId: string } }) {
  const moduloId = parseInt(params.moduloId, 10);
  const modulo = MODULOS_NICHOS.find((m) => m.id === moduloId);
  const missoesModulo = MISSOES_CATALOGO.filter((m) => m.modulo_id === moduloId);

  const [missoesConcluidas, setMissoesConcluidas] = useState<number[]>([]);
  // Para o Módulo 1 (Blocos), abas: 'aulas' | 'laboratorio' | 'missoes'
  const [abaBlocos, setAbaBlocos] = useState<'aulas' | 'laboratorio' | 'missoes'>('aulas');
  const [faseLaboratorioId, setFaseLaboratorioId] = useState<number>(1);

  useEffect(() => {
    try {
      const salvas = localStorage.getItem('codequest_missoes_concluidas');
      if (salvas) {
        setMissoesConcluidas(JSON.parse(salvas));
      }
    } catch (e) {}
  }, []);

  if (!modulo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full flex-1 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Módulo não encontrado</h2>
        <p className="text-slate-400 mb-6 text-sm">
          O módulo solicitado não existe na trilha de aprendizagem.
        </p>
        <Link href="/trilha">
          <Button>Voltar para a Trilha</Button>
        </Link>
      </div>
    );
  }

  const getIcone = () => {
    switch (modulo.id) {
      case 1:
        return <Blocks className="w-6 h-6 text-purple-400" />;
      case 2:
        return <Code className="w-6 h-6 text-cyan-400" />;
      case 3:
        return <FileCode className="w-6 h-6 text-emerald-400" />;
      case 4:
        return <Layers className="w-6 h-6 text-amber-400" />;
      default:
        return <BookOpen className="w-6 h-6 text-indigo-400" />;
    }
  };

  const concluidasDesteModulo = missoesModulo.filter((m) => missoesConcluidas.includes(m.id)).length;
  const porcentagem = Math.round((concluidasDesteModulo / missoesModulo.length) * 100);

  const handleIrParaLaboratorio = (desafioId?: number) => {
    if (desafioId) setFaseLaboratorioId(desafioId);
    setAbaBlocos('laboratorio');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
      <div className="mb-6">
        <Link href="/trilha" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Trilha Pedagógica
        </Link>
      </div>

      <div className="space-y-6">
        {/* Card do Cabeçalho do Módulo */}
        <Card className="border-quest-border bg-slate-900/90 shadow-2xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-900/60 shadow">
                  {getIcone()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="purple">{modulo.tecnologia}</Badge>
                    {modulo.id === 1 && <Badge variant="cyan">Ambiente Scratch Interativo</Badge>}
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl mt-1 text-white">{modulo.titulo}</CardTitle>
                </div>
              </div>
            </div>
            <CardDescription className="text-slate-300 text-sm leading-relaxed max-w-3xl">
              {modulo.descricao}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Barra de Progresso */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Progresso de Conclusão do Módulo</span>
                <span className="font-bold text-emerald-400">
                  {concluidasDesteModulo} de {missoesModulo.length} missões concluídas ({porcentagem}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${porcentagem}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CONTROLE DE ABAS ESPECÍFICO PARA PROGRAMAÇÃO EM BLOCOS (MÓDULO 1) */}
        {modulo.id === 1 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-quest-border pb-3">
            <button
              onClick={() => setAbaBlocos('aulas')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                abaBlocos === 'aulas'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 border border-quest-border hover:bg-slate-800 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>1. Aulas Explicativas (Como Fazer)</span>
            </button>

            <button
              onClick={() => setAbaBlocos('laboratorio')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                abaBlocos === 'laboratorio'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 border border-quest-border hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Puzzle className="w-4 h-4" />
              <span>2. Laboratório de Blocos (Estilo Scratch)</span>
            </button>

            <button
              onClick={() => setAbaBlocos('missoes')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                abaBlocos === 'missoes'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 border border-quest-border hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>3. Catálogo de Desafios ({missoesModulo.length})</span>
            </button>
          </div>
        )}

        {/* CONTEÚDO CONDICIONAL PARA O MÓDULO 1 (BLOCOS) */}
        {modulo.id === 1 ? (
          <div>
            {abaBlocos === 'aulas' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <span>Aulas Teóricas e Práticas de Programação em Blocos</span>
                  </h2>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAbaBlocos('laboratorio')}
                    className="text-xs gap-1.5"
                  >
                    <span>Abrir Laboratório de Blocos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <AulasBlocos onIrParaLaboratorio={handleIrParaLaboratorio} />
              </div>
            )}

            {abaBlocos === 'laboratorio' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Puzzle className="w-5 h-5 text-indigo-400" />
                      <span>Laboratório Interativo ScratchQuest</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Encaixe os blocos coloridos da paleta, conecte as peças lógicas e execute no palco 2D animado.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAbaBlocos('aulas')}
                    className="text-xs gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Rever Aulas</span>
                  </Button>
                </div>
                <ScratchBlockEditor desafioInicialId={faseLaboratorioId} />
              </div>
            )}

            {abaBlocos === 'missoes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-400" />
                    <span>Missões Oficiais de Programação em Blocos ({missoesModulo.length})</span>
                  </h2>
                  <Link href={`/missoes?modulo_id=${modulo.id}`}>
                    <span className="text-xs text-indigo-400 hover:text-indigo-300 transition hover:underline">
                      Filtrar no catálogo geral
                    </span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {missoesModulo.map((m) => {
                    const estaConcluida = missoesConcluidas.includes(m.id);
                    return (
                      <Card
                        key={m.id}
                        className={`hover:border-indigo-500/60 transition-colors bg-slate-900/70 ${
                          estaConcluida ? 'border-emerald-500/40' : ''
                        }`}
                      >
                        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  m.dificuldade === 'facil' ? 'cyan' : m.dificuldade === 'medio' ? 'warning' : 'danger'
                                }
                              >
                                {m.dificuldade.toUpperCase()}
                              </Badge>
                              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                +{m.xp} XP
                              </span>
                              {estaConcluida && (
                                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" /> Concluída
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-bold text-white hover:text-indigo-400 transition-colors">
                              <Link href={`/missoes/${m.id}`}>{m.titulo}</Link>
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2">{m.enunciado}</p>
                          </div>

                          <Link href={`/missoes/${m.id}`} className="shrink-0">
                            <Button
                              size="sm"
                              variant={estaConcluida ? 'outline' : 'primary'}
                              className="text-xs gap-1.5 w-full sm:w-auto"
                            >
                              <span>{estaConcluida ? 'Revisar no Laboratório' : 'Resolver em Blocos'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* LISTA DE MISSÕES PADRÃO PARA OS DEMAIS MÓDULOS (2, 3, 4) */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span>Missões Práticas deste Módulo ({missoesModulo.length})</span>
              </h2>
              <Link href={`/missoes?modulo_id=${modulo.id}`}>
                <span className="text-xs text-indigo-400 hover:text-indigo-300 transition hover:underline">
                  Filtrar no catálogo geral
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {missoesModulo.map((m) => {
                const estaConcluida = missoesConcluidas.includes(m.id);
                return (
                  <Card
                    key={m.id}
                    className={`hover:border-indigo-500/60 transition-colors bg-slate-900/70 ${
                      estaConcluida ? 'border-emerald-500/40' : ''
                    }`}
                  >
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              m.dificuldade === 'facil' ? 'cyan' : m.dificuldade === 'medio' ? 'warning' : 'danger'
                            }
                          >
                            {m.dificuldade.toUpperCase()}
                          </Badge>
                          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            +{m.xp} XP
                          </span>
                          {estaConcluida && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Concluída
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white hover:text-indigo-400 transition-colors">
                          <Link href={`/missoes/${m.id}`}>{m.titulo}</Link>
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2">{m.enunciado}</p>
                      </div>

                      <Link href={`/missoes/${m.id}`} className="shrink-0">
                        <Button
                          size="sm"
                          variant={estaConcluida ? 'outline' : 'primary'}
                          className="text-xs gap-1.5 w-full sm:w-auto"
                        >
                          <span>{estaConcluida ? 'Revisar Missão' : 'Iniciar Missão'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
