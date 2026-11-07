'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Target,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Play,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  Code2,
  RotateCcw,
  BookOpen,
  Puzzle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { MISSOES_CATALOGO, MissaoCompleta } from '@/data/missoes';
import { ScratchBlockEditor } from '@/components/blocos/ScratchBlockEditor';

export default function MissaoDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const missaoId = parseInt(params.id, 10);

  const [missao, setMissao] = useState<MissaoCompleta | null>(() => {
    return MISSOES_CATALOGO.find((m) => m.id === missaoId) || null;
  });

  const [codigo, setCodigo] = useState<string>('');
  const [copiado, setCopiado] = useState(false);
  const [submetendo, setSubmetendo] = useState(false);
  const [sucessoModal, setSucessoModal] = useState(false);
  const [jaConcluida, setJaConcluida] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    // Buscar da API caso exista no banco
    fetch(`/api/missoes/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.sucesso && data.dados?.missao) {
          setMissao(data.dados.missao);
          setCodigo(data.dados.missao.codigo_inicial);
        }
      })
      .catch(() => {});

    // Verificar se já foi concluída no localStorage
    try {
      const salvas = localStorage.getItem('codequest_missoes_concluidas');
      if (salvas) {
        const ids: number[] = JSON.parse(salvas);
        if (ids.includes(missaoId)) {
          setJaConcluida(true);
        }
      }
    } catch (e) {}
  }, [missaoId, params.id]);

  useEffect(() => {
    if (missao && !codigo) {
      setCodigo(missao.codigo_inicial);
    }
  }, [missao, codigo]);

  if (!missao) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full flex-1 flex flex-col items-center justify-center text-center">
        <Target className="w-16 h-16 text-slate-600 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-white mb-2">Missão não encontrada</h2>
        <p className="text-slate-400 mb-6 text-sm">
          A missão solicitada (#{params.id}) não existe em nosso catálogo de desafios.
        </p>
        <Link href="/missoes">
          <Button>Voltar ao Catálogo</Button>
        </Link>
      </div>
    );
  }

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const restaurarCodigo = () => {
    setCodigo(missao.codigo_inicial);
    setToastMsg('Código inicial restaurado.');
  };

  const handleSubmeter = () => {
    setSubmetendo(true);

    setTimeout(() => {
      setSubmetendo(false);
      setJaConcluida(true);
      setSucessoModal(true);

      // Salvar conclusão no localStorage
      try {
        const salvas = localStorage.getItem('codequest_missoes_concluidas');
        const ids: number[] = salvas ? JSON.parse(salvas) : [];
        if (!ids.includes(missao.id)) {
          ids.push(missao.id);
          localStorage.setItem('codequest_missoes_concluidas', JSON.stringify(ids));
        }
      } catch (e) {}
    }, 1000);
  };

  const proximaMissaoId = missao.id < 16 ? missao.id + 1 : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
      {/* Toast de notificação */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50">
          <Toast tipo="info" mensagem={toastMsg} aoFechar={() => setToastMsg(null)} />
        </div>
      )}

      {/* Navegação de Retorno */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/missoes"
          className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Catálogo de Missões
        </Link>

        <div className="flex items-center gap-2">
          {missao.modulo_id === 1 && (
            <Link href="/trilha/1">
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ver Aulas de Blocos</span>
              </Button>
            </Link>
          )}

          {jaConcluida && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Missão Concluída (+{missao.xp} XP)
            </span>
          )}
        </div>
      </div>

      {/* SE FOR DO MÓDULO 1 (PROGRAMAÇÃO EM BLOCOS), RENDERIZA O LABORATÓRIO SCRATCHQUEST VISUAL */}
      {missao.modulo_id === 1 ? (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Puzzle className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-indigo-300 block">Modo Visual de Programação em Blocos</span>
                <span className="text-xs text-slate-300">
                  Encaixe as peças de quebra-cabeça na área de scripts e aperte o botão Executar para mover o herói no tabuleiro!
                </span>
              </div>
            </div>
            <Link href="/trilha/1">
              <Button size="sm" variant="ghost" className="text-xs text-indigo-300 hover:text-white shrink-0">
                Aulas Explicativas ➔
              </Button>
            </Link>
          </div>

          <ScratchBlockEditor
            desafioInicialId={missao.id}
            onConcluirDesafio={() => setJaConcluida(true)}
          />
        </div>
      ) : (
        /* PARA OS OUTROS MÓDULOS (PYTHON, HTML, JS), RENDERIZA O CARD PADRÃO */
        <div className="space-y-6">
          <Card className="border-quest-border bg-slate-900/90 shadow-2xl">
            <CardHeader className="pb-4 border-b border-quest-border">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{missao.nicho}</Badge>
                  <Badge
                    variant={
                      missao.dificuldade === 'facil'
                        ? 'cyan'
                        : missao.dificuldade === 'medio'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    Dificuldade: {missao.dificuldade.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-900/60 px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recompensa: +{missao.xp} XP</span>
                </div>
              </div>

              <CardTitle className="text-2xl sm:text-3xl text-white">{missao.titulo}</CardTitle>
              <CardDescription className="text-sm text-slate-300 mt-2 leading-relaxed">
                {missao.enunciado}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Critério de Aceite */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/80 text-sm text-indigo-300 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Critério de Aceite:</strong>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {missao.criterio_aceite}
                  </p>
                </div>
              </div>

              {/* Dica do Mestre */}
              {missao.dica && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/60 text-xs sm:text-sm text-amber-300 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200 block mb-0.5">Dica Pedagógica do Mestre:</strong>
                    <p className="text-slate-300 leading-relaxed">{missao.dica}</p>
                  </div>
                </div>
              )}

              {/* Editor de Código Tradicional para Python/HTML/JS */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    Editor de Código da Missão ({missao.tecnologia})
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={restaurarCodigo}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition px-2 py-1 rounded hover:bg-slate-800"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Restaurar Original
                    </button>
                    <button
                      type="button"
                      onClick={copiarCodigo}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition px-2 py-1 rounded hover:bg-slate-800"
                    >
                      {copiado ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <div className="relative rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-200 focus-within:border-indigo-500 shadow-inner">
                  <textarea
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    rows={9}
                    className="w-full bg-transparent resize-y outline-none font-mono text-xs sm:text-sm text-slate-200 leading-relaxed"
                    placeholder="Escreva sua solução aqui..."
                  />
                </div>
              </div>

              {/* Ações de Submissão */}
              <div className="pt-4 border-t border-quest-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link href="/missoes" className="w-full sm:w-auto">
                  <Button variant="ghost" className="w-full sm:w-auto">
                    Outras Missões
                  </Button>
                </Link>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    onClick={handleSubmeter}
                    isLoading={submetendo}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold gap-2 shadow-lg shadow-indigo-600/30"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{jaConcluida ? 'Validar Novamente' : 'Testar e Concluir Missão'}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Conclusão / Comemoração */}
      {sucessoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-md w-full border-emerald-500/50 bg-slate-900 text-center shadow-2xl relative">
            <CardHeader className="pt-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl text-white">Missão Cumprida!</CardTitle>
              <CardDescription className="text-slate-300 mt-1">
                Você superou com louvor os critérios de aceite de <strong>{missao.titulo}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around">
                <div>
                  <div className="text-xs text-slate-400">XP Concedido</div>
                  <div className="text-xl font-bold text-amber-400">+{missao.xp} XP</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400">Nicho Pedagógico</div>
                  <div className="text-sm font-semibold text-purple-400">{missao.nicho}</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {proximaMissaoId && (
                  <Link href={`/missoes/${proximaMissaoId}`}>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2 font-semibold"
                      onClick={() => setSucessoModal(false)}
                    >
                      <span>Avançar para a Próxima Missão</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSucessoModal(false)}
                >
                  Continuar Neste Desafio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
