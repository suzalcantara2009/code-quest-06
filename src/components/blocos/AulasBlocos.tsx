'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Blocks,
  ArrowRight,
  Compass,
  Repeat,
  Split,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCw,
  RotateCcw,
  Footprints,
  Eye,
  Database,
  Radio,
  Flame,
  Gem,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// ============================================================
// MINI-ANIMAÇÃO 1: O ROBÔ E A RECEITA (AULA 1)
// ============================================================
function MiniAnimacaoRobo() {
  const [passo, setPasso] = useState(0);
  const [executando, setExecutando] = useState(false);
  const [modo, setModo] = useState<'correto' | 'erro'>('correto');

  const passosCorretos = [
    { texto: '1. Robô liga os sensores', balao: 'Iniciando sistema... 🤖' },
    { texto: '2. Avança 2 passos até a mesa', balao: 'Caminhando até a mesa 🚶‍♂️' },
    { texto: '3. Estende o braço mecânico', balao: 'Braço estendido 🦾' },
    { texto: '4. Segura o cálice mágico', balao: 'Cálice em mãos! Sucesso! 🏆' },
  ];

  const passosComErro = [
    { texto: '1. Robô liga os sensores', balao: 'Iniciando sistema... 🤖' },
    { texto: '2. [ERRO] Estende o braço no ar!', balao: 'Ué? Cadê o cálice? ❓' },
    { texto: '3. Tenta segurar o vazio', balao: 'Nada para pegar aqui!' },
    { texto: '4. Bate na mesa atrasado', balao: 'BUM! Bati na mesa! 💥' },
  ];

  const passosAtuais = modo === 'correto' ? passosCorretos : passosComErro;

  const rodarAnimacao = () => {
    if (executando) return;
    setExecutando(true);
    setPasso(0);

    let p = 0;
    const interval = setInterval(() => {
      p++;
      if (p < passosAtuais.length) {
        setPasso(p);
      } else {
        clearInterval(interval);
        setExecutando(false);
      }
    }, 1200);
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Simulação Interativa: O Robô Obedecendo o Algoritmo
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => { setModo('correto'); setPasso(0); }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              modo === 'correto' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Ordem Correta
          </button>
          <button
            type="button"
            onClick={() => { setModo('erro'); setPasso(0); }}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              modo === 'erro' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Ordem com Erro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Passos do Código */}
        <div className="space-y-1.5 font-mono text-xs">
          {passosAtuais.map((item, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                passo === idx
                  ? modo === 'correto'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 scale-[1.02] shadow-md'
                    : 'bg-red-950/80 border-red-500 text-red-200 scale-[1.02] shadow-md'
                  : idx < passo
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                  : 'bg-slate-900/30 border-slate-800/60 text-slate-500'
              }`}
            >
              <span>{item.texto}</span>
              {passo === idx && <span className="text-[10px] animate-pulse">● Executando</span>}
            </div>
          ))}
        </div>

        {/* Palco Animado do Robô */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-xl border border-slate-800 min-h-[140px] text-center relative overflow-hidden">
          {/* Balão de Fala do Robô */}
          <div className="mb-2 bg-indigo-900/80 text-white text-xs px-3 py-1.5 rounded-xl border border-indigo-700 shadow animate-bounce">
            {passosAtuais[passo].balao}
          </div>

          {/* O Avatar / Robô com deslocamento visual */}
          <div className="flex items-center gap-4 text-3xl">
            <span
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${passo * (modo === 'correto' ? 18 : 6)}px) ${
                  modo === 'erro' && passo === 3 ? 'rotate(45deg)' : ''
                }`,
              }}
            >
              🤖
            </span>
            <span className="text-xl opacity-30">➔</span>
            <span className="text-2xl">🏆</span>
          </div>

          <Button
            size="sm"
            onClick={rodarAnimacao}
            disabled={executando}
            className="mt-3 text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-500"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{executando ? 'Executando...' : '▶ Assistir Animação'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MINI-ANIMAÇÃO 2: SIMULADOR GIRAR VS AVANÇAR (AULA 2)
// ============================================================
function MiniSimuladorGirar() {
  const [pos, setPos] = useState({ x: 2, y: 2 });
  const [angulo, setAngulo] = useState(90); // 0: Cima, 90: Direita, 180: Baixo, 270: Esquerda

  const girar = (delta: number) => {
    setAngulo((prev) => (prev + delta + 360) % 360);
  };

  const avancar = () => {
    setPos((prev) => {
      let nx = prev.x;
      let ny = prev.y;
      if (angulo === 0) ny = Math.max(0, ny - 1);
      if (angulo === 90) nx = Math.min(4, nx + 1);
      if (angulo === 180) ny = Math.min(4, ny + 1);
      if (angulo === 270) nx = Math.max(0, nx - 1);
      return { x: nx, y: ny };
    });
  };

  const resetar = () => {
    setPos({ x: 2, y: 2 });
    setAngulo(90);
  };

  const direcaoNome =
    angulo === 0 ? 'Norte (Cima)' : angulo === 90 ? 'Leste (Direita)' : angulo === 180 ? 'Sul (Baixo)' : 'Oeste (Esquerda)';

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Simulador Espacial: Teste os Giros do Avatar
          </span>
        </div>
        <span className="text-[11px] text-cyan-300 font-mono font-semibold">
          Virado para: {direcaoNome} ({angulo}°)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Grid 5x5 do Simulador */}
        <div className="flex items-center justify-center p-2 bg-slate-900 rounded-xl border border-slate-800">
          <div className="grid grid-cols-5 gap-1.5 w-full max-w-[200px] aspect-square">
            {Array.from({ length: 25 }).map((_, idx) => {
              const gx = idx % 5;
              const gy = Math.floor(idx / 5);
              const isHero = pos.x === gx && pos.y === gy;
              return (
                <div
                  key={idx}
                  className={`rounded-lg flex items-center justify-center text-sm border transition-all ${
                    isHero
                      ? 'bg-indigo-600 border-indigo-400 shadow-lg scale-105'
                      : 'bg-slate-950/80 border-slate-800/80'
                  }`}
                >
                  {isHero && (
                    <span
                      className="transition-transform duration-300 inline-block text-lg"
                      style={{ transform: `rotate(${angulo - 90}deg)` }}
                    >
                      🧙‍♂️
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botões de Ação Interativa */}
        <div className="space-y-2.5">
          <p className="text-xs text-slate-300 leading-relaxed">
            Clique nos botões abaixo e veja como <strong>Girar</strong> apenas roda o herói, e <strong>Avançar</strong> o move no sentido que ele está olhando:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => girar(-90)}
              className="text-xs gap-1 border-blue-500/50 hover:bg-blue-950/40 text-blue-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Girar 90° Esquerda
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => girar(90)}
              className="text-xs gap-1 border-blue-500/50 hover:bg-blue-950/40 text-blue-300"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Girar 90° Direita
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={avancar}
              className="w-full text-xs gap-1.5 bg-blue-600 hover:bg-blue-500 font-bold shadow"
            >
              <Footprints className="w-3.5 h-3.5" />
              Avançar 1 Passo à Frente
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={resetar}
              className="text-xs text-slate-400 hover:text-white"
            >
              Centralizar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MINI-ANIMAÇÃO 3: O LAÇO DE REPETIÇÃO ANIMADO (AULA 3)
// ============================================================
function MiniAnimacaoLoop() {
  const [contador, setContador] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [cristais, setCristais] = useState([true, true, true, true]);

  const dispararLoop = () => {
    if (rodando) return;
    setRodando(true);
    setContador(0);
    setCristais([true, true, true, true]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setContador(i);
      setCristais((prev) => {
        const copy = [...prev];
        if (i - 1 < copy.length) copy[i - 1] = false;
        return copy;
      });

      if (i >= 4) {
        clearInterval(interval);
        setRodando(false);
      }
    }, 900);
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Repeat className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Animação de Loop: 1 Bloco Repetindo 4 Vezes
          </span>
        </div>
        <span className="text-[11px] text-amber-300 font-mono font-semibold">
          Ciclo: {contador}/4
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Visual do Bloco de Repetição */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <div
            className={`p-2 rounded-lg bg-orange-600 text-white font-bold text-xs flex items-center justify-between transition-all ${
              rodando ? 'ring-2 ring-yellow-400 scale-[1.02]' : ''
            }`}
          >
            <span>🔁 Repetir (4) vezes:</span>
            <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded">
              {contador}/4
            </span>
          </div>
          <div className="pl-4 border-l-4 border-orange-500 ml-2 space-y-1">
            <div className="p-1.5 rounded bg-blue-600 text-white text-xs font-semibold">
              Avançar 1 passo
            </div>
            <div className="p-1.5 rounded bg-amber-600 text-white text-xs font-semibold">
              Coletar Cristal 💎
            </div>
          </div>
        </div>

        {/* Trilha Animada de Coleta */}
        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3 text-xl">
            {cristais.map((tem, idx) => (
              <div
                key={idx}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  contador === idx + 1
                    ? 'border-amber-400 bg-amber-950/60 scale-110 shadow-lg shadow-amber-500/20'
                    : 'border-slate-800 bg-slate-950'
                }`}
              >
                {tem ? <span className="animate-pulse">💎</span> : <span className="text-xs text-emerald-400 font-bold">✓</span>}
              </div>
            ))}
          </div>

          <Button
            size="sm"
            onClick={dispararLoop}
            disabled={rodando}
            className="text-xs gap-1.5 bg-orange-600 hover:bg-orange-500 font-bold"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{rodando ? 'Loop Rodando...' : '▶ Disparar Loop 4x'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MINI-ANIMAÇÃO 4: ENCRUZILHADA CONDICIONAL (AULA 4)
// ============================================================
function MiniAnimacaoCondicional() {
  const [temChave, setTemChave] = useState(true);
  const [caminhoEscolhido, setCaminhoEscolhido] = useState<'A' | 'B' | null>(null);

  const testarCondicional = () => {
    setCaminhoEscolhido(temChave ? 'A' : 'B');
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Split className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Simulador de Decisão: A Encruzilhada Mágica
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Inventário:</span>
          <button
            type="button"
            onClick={() => { setTemChave(!temChave); setCaminhoEscolhido(null); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              temChave
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span>{temChave ? '🔑 Chave Dourada (SIM)' : 'Sem Chave (NÃO)'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Bloco Condicional Estilo Scratch */}
        <div className="space-y-1.5 text-xs font-mono">
          <div className="p-2 rounded-t-lg bg-emerald-700 text-white font-bold">
            🌿 SE (tem_chave_dourada == VERDADEIRO) ENTÃO:
          </div>
          <div
            className={`p-2 pl-4 border-l-4 border-emerald-500 bg-slate-900 transition-all ${
              caminhoEscolhido === 'A' ? 'bg-emerald-950/80 text-emerald-300 font-bold ring-2 ring-emerald-400' : 'text-slate-400'
            }`}
          >
            ➔ Abrir Portão Principal da Cidadela
          </div>
          <div className="p-2 bg-emerald-800 text-white font-bold">
            🍂 SENÃO:
          </div>
          <div
            className={`p-2 pl-4 border-l-4 border-emerald-600 bg-slate-900 rounded-b-lg transition-all ${
              caminhoEscolhido === 'B' ? 'bg-amber-950/80 text-amber-300 font-bold ring-2 ring-amber-400' : 'text-slate-400'
            }`}
          >
            ➔ Desviar pelo Atalho Secreto das Catacumbas
          </div>
        </div>

        {/* Efeito Visual do Caminho */}
        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center space-y-2">
          <div className="text-xs font-semibold text-slate-300">
            {caminhoEscolhido === 'A' && (
              <span className="text-emerald-400 animate-bounce block">
                🚪 O portão dourado se abriu majestosamente!
              </span>
            )}
            {caminhoEscolhido === 'B' && (
              <span className="text-amber-400 animate-bounce block">
                🕯️ O herói desvia com cautela pela caverna lateral!
              </span>
            )}
            {!caminhoEscolhido && <span>Alterne a posse da chave e teste a decisão:</span>}
          </div>

          <Button
            size="sm"
            onClick={testarCondicional}
            className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-500 font-bold"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Executar Decisão Condicional</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL DAS AULAS EXPLICATIVAS (6 AULAS)
// ============================================================
interface Aula {
  id: number;
  titulo: string;
  subtitulo: string;
  duracao: string;
  icone: any;
  cor: string;
  conteudo: React.ReactNode;
}

interface AulasBlocosProps {
  onIrParaLaboratorio?: (desafioId?: number) => void;
}

export function AulasBlocos({ onIrParaLaboratorio }: AulasBlocosProps) {
  const [aulaAtiva, setAulaAtiva] = useState(1);

  const aulas: Aula[] = [
    {
      id: 1,
      titulo: 'Aula 1: O que é um Algoritmo e a Lógica do Scratch',
      subtitulo: 'Entenda como computadores pensam e como blocos funcionam como peças de Lego.',
      duracao: '5 min de leitura + Animação',
      icone: Blocks,
      cor: 'purple',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              O Computador é como um Robô que não adivinha nada!
            </h4>
            <p>
              Imagine que você peça a um amigo: <em>&ldquo;Pegue um copo de água para mim&rdquo;</em>. Seu amigo entende imediatamente o que fazer.
              Porém, se você disser isso a um robô, ele ficará paralisado! Ele não sabe onde fica a cozinha, o que é um copo ou como abrir a torneira.
            </p>
          </div>

          {/* SIMULAÇÃO ANIMADA DA AULA 1 */}
          <MiniAnimacaoRobo />

          <div>
            <h4 className="text-white font-semibold text-base mb-2">Os 3 Mandamentos do Algoritmo</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 font-bold mx-auto mb-1 flex items-center justify-center text-xs">
                  1
                </div>
                <div className="font-semibold text-white text-xs">Instrução Atômica</div>
                <div className="text-[11px] text-slate-400 mt-1">Ações simples que o robô sabe fazer (ex: Avançar 1 passo).</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 font-bold mx-auto mb-1 flex items-center justify-center text-xs">
                  2
                </div>
                <div className="font-semibold text-white text-xs">Ordem Rigorosa</div>
                <div className="text-[11px] text-slate-400 mt-1">A ordem importa! Você não pode calçar o sapato antes da meia.</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 font-bold mx-auto mb-1 flex items-center justify-center text-xs">
                  3
                </div>
                <div className="font-semibold text-white text-xs">Objetivo Claro</div>
                <div className="text-[11px] text-slate-400 mt-1">Todo algoritmo tem um ponto final de sucesso bem definido.</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pronto para a prática?</div>
              <div className="text-xs text-slate-400">Monte o sequenciamento na primeira missão prática do laboratório.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(1)} className="gap-1.5 text-xs">
                <span>Ir para Desafio 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      titulo: 'Aula 2: Movimento e Raciocínio Espacial',
      subtitulo: 'Entenda a diferença crucial entre "Avançar" e "Girar" no eixo do personagem.',
      duracao: '6 min de leitura + Simulador',
      icone: Footprints,
      cor: 'cyan',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              O Maior Erro dos Iniciantes em Scratch!
            </h4>
            <p>
              Muitos estudantes acham que o bloco <strong>&ldquo;Girar à Direita&rdquo;</strong> faz o personagem andar para o lado direito da tela.
              <strong> Não faz!</strong> Girar apenas rotaciona a cabeça do boneco em 90 graus no mesmo lugar onde ele está.
            </p>
          </div>

          {/* SIMULADOR INTERATIVO DA AULA 2 */}
          <MiniSimuladorGirar />

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique curvas e desvios no grid!</div>
              <div className="text-xs text-slate-400">Contorne as muralhas sem bater a cabeça no Desafio 2.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(2)} className="gap-1.5 text-xs">
                <span>Ir para Desafio 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      titulo: 'Aula 3: Laços de Repetição (Loops) — Trabalhar Menos',
      subtitulo: 'Aprenda a usar o bloco "Repetir N vezes" para economizar blocos e criar padrões inteligentes.',
      duracao: '6 min de leitura + Animação',
      icone: Repeat,
      cor: 'amber',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Repeat className="w-4 h-4 text-amber-400" />
              O Princípio do DRY: Não repita a si mesmo!
            </h4>
            <p>
              Imagine que você precise andar por um corredor comprido de 10 quadrados.
              Você prefere arrastar 10 blocos iguais de <em>&ldquo;Avançar&rdquo;</em> um embaixo do outro ou colocar apenas <strong>1 bloco de repetição</strong>?
            </p>
          </div>

          {/* SIMULADOR ANIMADO DA AULA 3 */}
          <MiniAnimacaoLoop />

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique Loops no Desafio 3!</div>
              <div className="text-xs text-slate-400">Colete os cristais do corredor usando repetição.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(3)} className="gap-1.5 text-xs">
                <span>Ir para Desafio 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 4,
      titulo: 'Aula 4: Condicionais (SE / SENÃO) e Tomada de Decisão',
      subtitulo: 'Dê inteligência ao herói: faça-o desviar de obstáculos e reagir ao ambiente.',
      duracao: '7 min de leitura + Simulador',
      icone: Split,
      cor: 'emerald',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Split className="w-4 h-4 text-emerald-400" />
              O Cérebro da Programação: Escolher Caminhos
            </h4>
            <p>
              Até agora nossos algoritmos eram linhas retas previsíveis. Mas o que acontece se aparecer uma muralha ou um portão trancado no meio do caminho?
              É aqui que entram as <strong>estruturas condicionais</strong>!
            </p>
          </div>

          {/* SIMULADOR INTERATIVO DA AULA 4 */}
          <MiniAnimacaoCondicional />

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Desafio com Obstáculos!</div>
              <div className="text-xs text-slate-400">Resolva caminhos com desvios complexos no Desafio 4.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(4)} className="gap-1.5 text-xs">
                <span>Ir para Desafio 4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 5,
      titulo: 'Aula 5: Sensores e Detecção no Tabuleiro',
      subtitulo: 'Como o personagem descobre paredes, tochas e cristais próximos a ele.',
      duracao: '5 min de leitura',
      icone: Radio,
      cor: 'cyan',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              Os Olhos do Herói: O que são Sensores?
            </h4>
            <p>
              No Scratch, um sensor é um bloco com pontas hexagonais <code>&lt;tocando em algo?&gt;</code> que retorna apenas <strong>VERDADEIRO</strong> ou <strong>FALSO</strong>.
              Ele serve como o radar do personagem para não colidir com paredes ou identificar se a tocha à sua frente já está acesa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-emerald-400 font-bold text-xs uppercase mb-1">Sensor: Tocha Apagada?</div>
              <p className="text-xs text-slate-300">
                Retorna verdadeiro se o herói estiver no mesmo quadrado da tocha e ela ainda estiver sem fogo.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-amber-400 font-bold text-xs uppercase mb-1">Sensor: Parede à Frente?</div>
              <p className="text-xs text-slate-300">
                Verifica se o próximo quadrado na direção do herói é um obstáculo intransponível.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pronto para o Desafio do Fosso?</div>
              <div className="text-xs text-slate-400">Navegue por percursos estreitos sem colidir no Desafio 5.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(5)} className="gap-1.5 text-xs">
                <span>Ir para Desafio 5</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 6,
      titulo: 'Aula 6: Variáveis — As Caixas Mágicas de Memória',
      subtitulo: 'Entenda como armazenar pontos, XP, tochas acesas e número de vidas com blocos de dados.',
      duracao: '6 min de leitura',
      icone: Database,
      cor: 'purple',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              O Baú com uma Etiqueta
            </h4>
            <p>
              Uma <strong>variável</strong> é simplesmente um baú com uma etiqueta onde você guarda um valor (como <code>pontos = 100</code> ou <code>vidas = 3</code>).
              Você pode ler o que está dentro a qualquer momento ou somar novos valores durante a aventura!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="text-xs font-bold uppercase text-amber-400">Exemplo no Scratch:</h5>
            <div className="space-y-1 font-mono text-xs max-w-sm">
              <div className="p-2 rounded bg-orange-700 text-white font-semibold">definir [cristais_coletados] para 0</div>
              <div className="p-2 rounded bg-orange-600 text-white font-semibold">mudar [cristais_coletados] por 1</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">O Desafio Épico Final!</div>
              <div className="text-xs text-slate-400">Combine tudo o que aprendeu no Desafio do Mestre dos Magos.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(8)} className="gap-1.5 text-xs">
                <span>Ir para o Chefe Final (Desafio 8)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      ),
    },
  ];

  const aulaAtual = aulas.find((a) => a.id === aulaAtiva) || aulas[0];

  return (
    <div className="space-y-6">
      {/* Seletor de Aulas (6 Lições) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {aulas.map((aula) => {
          const Icone = aula.icone;
          const ativa = aula.id === aulaAtiva;
          return (
            <button
              key={aula.id}
              onClick={() => setAulaAtiva(aula.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                ativa
                  ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-600/20 text-white scale-[1.02]'
                  : 'bg-slate-900/60 border-quest-border hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${ativa ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  <Icone className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">#{aula.id}</span>
              </div>
              <div>
                <div className={`text-xs font-bold leading-tight line-clamp-1 ${ativa ? 'text-white' : 'text-slate-300'}`}>
                  Aula {aula.id}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {aula.titulo.split(':')[1]?.trim() || aula.titulo}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Aula Ativa */}
      <Card className="border-quest-border bg-slate-900/90 shadow-2xl">
        <CardHeader className="border-b border-quest-border pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="purple">Lição Interativa {aulaAtual.id} de {aulas.length}</Badge>
            <span className="text-xs text-slate-400">{aulaAtual.duracao}</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl text-white mt-1">{aulaAtual.titulo}</CardTitle>
          <p className="text-xs sm:text-sm text-slate-400">{aulaAtual.subtitulo}</p>
        </CardHeader>
        <CardContent className="pt-6">{aulaAtual.conteudo}</CardContent>
      </Card>
    </div>
  );
}
