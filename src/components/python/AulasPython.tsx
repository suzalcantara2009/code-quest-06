'use client';

import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Blocks,
  ArrowRight,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Split,
  Repeat,
  Layers,
  HelpCircle,
  Database,
  Cpu,
  Boxes,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// ============================================================
// SIMULADOR 1: O TRADUTOR INTERATIVO DE BLOCOS PARA PYTHON (AULA 1)
// ============================================================
function SimuladorBlocosParaPython() {
  const [blocoEscolhido, setBlocoEscolhido] = useState<number>(0);
  const [saidaTerminal, setSaidaTerminal] = useState<string>('Clique em "Executar no Python" para ver o resultado.');

  const exemplos = [
    {
      blocoLabel: 'Exibir Texto ("Saudações, Aventureiro!")',
      blocoCategoria: 'Ação (Âmbar)',
      blocoCor: 'bg-amber-600',
      pythonCodigo: 'print("Saudações, Aventureiro!")',
      executar: () => 'Saudações, Aventureiro!',
      explicacao: 'No Scratch você usava o bloco "Diga". Em Python, usamos a função print() com o texto entre aspas.',
    },
    {
      blocoLabel: 'Definir [poder_magico] para (85)',
      blocoCategoria: 'Variável (Laranja)',
      blocoCor: 'bg-orange-600',
      pythonCodigo: 'poder_magico = 85\nprint(f"Poder do herói: {poder_magico} pts")',
      executar: () => 'Poder do herói: 85 pts',
      explicacao: 'Em Python não precisamos arrastar um bloco de variável: basta digitar o nome e usar o sinal de igual (=).',
    },
    {
      blocoLabel: 'Avançar (3) passos',
      blocoCategoria: 'Movimento (Azul)',
      blocoCor: 'bg-blue-600',
      pythonCodigo: 'for passo in range(3):\n    heroi.avancar()\nprint("O herói caminhou 3 passos pelo castelo!")',
      executar: () => 'O herói caminhou 3 passos pelo castelo!',
      explicacao: 'Ações de movimento tornam-se chamadas a métodos em Python, como heroi.avancar() dentro de um for.',
    },
  ];

  const atual = exemplos[blocoEscolhido];

  const rodar = () => {
    setSaidaTerminal(atual.executar());
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Comparador Visual: Do Bloco ao Código Python
          </span>
        </div>
        <span className="text-[11px] text-slate-400">Escolha um bloco para converter:</span>
      </div>

      {/* Seletor de Blocos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {exemplos.map((ex, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setBlocoEscolhido(idx); setSaidaTerminal('Aguardando execução...'); }}
            className={`p-2.5 rounded-xl text-left border transition-all text-xs font-semibold ${
              blocoEscolhido === idx
                ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] text-slate-500 mb-0.5">{ex.blocoCategoria}</div>
            <div className="line-clamp-1">{ex.blocoLabel}</div>
          </button>
        ))}
      </div>

      {/* Lado a Lado: Bloco vs Python */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Bloco Scratch */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Blocks className="w-3.5 h-3.5 text-purple-400" />
              Como era no Scratch (Bloco Visual):
            </div>
            <div className={`p-3 rounded-xl ${atual.blocoCor} text-white font-bold text-xs shadow-md`}>
              {atual.blocoLabel}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">{atual.explicacao}</p>
        </div>

        {/* Equivalente em Python */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Como fica em Python (Texto Executável):
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
              <code>{atual.pythonCodigo}</code>
            </pre>
          </div>

          <Button
            size="sm"
            onClick={rodar}
            className="mt-3 text-xs gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold self-start"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Executar no Python</span>
          </Button>
        </div>
      </div>

      {/* Terminal de Saída */}
      <div className="p-3 rounded-xl bg-black border border-slate-800 font-mono text-xs flex items-center gap-2">
        <span className="text-emerald-400 font-bold">&gt;&gt;&gt;</span>
        <span className="text-slate-200">{saidaTerminal}</span>
      </div>
    </div>
  );
}

// ============================================================
// SIMULADOR 2: O SCANNER DE INDENTAÇÃO (AULA 2)
// ============================================================
function SimuladorIndentacao() {
  const [indentado, setIndentado] = useState(true);

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Split className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Simulador de Indentação: Os 4 Espaços Sagrados
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setIndentado(true)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              indentado ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Com Indentação (4 Espaços)
          </button>
          <button
            type="button"
            onClick={() => setIndentado(false)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              !indentado ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Sem Indentação (Erro!)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Código Python com destaque de espaço */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
          <div className="text-yellow-400">tem_pocao_vida = True</div>
          <div className="text-purple-400">if tem_pocao_vida:</div>
          <div
            className={`p-1.5 rounded transition-all ${
              indentado
                ? 'ml-6 bg-emerald-950/80 border border-emerald-600 text-emerald-300 font-bold'
                : 'ml-0 bg-red-950/80 border border-red-600 text-red-300'
            }`}
          >
            {indentado ? '····print("Vida recuperada!")' : 'print("Vida recuperada!")'}
          </div>
          <div className="text-purple-400">else:</div>
          <div
            className={`p-1.5 rounded transition-all ${
              indentado
                ? 'ml-6 bg-emerald-950/80 border border-emerald-600 text-emerald-300 font-bold'
                : 'ml-0 bg-red-950/80 border border-red-600 text-red-300'
            }`}
          >
            {indentado ? '····print("Mochila vazia...")' : 'print("Mochila vazia...")'}
          </div>
        </div>

        {/* Diagnóstico do Interpretador */}
        <div
          className={`p-4 rounded-xl border text-xs space-y-2 ${
            indentado
              ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
              : 'bg-red-950/40 border-red-700 text-red-300'
          }`}
        >
          <div className="font-bold text-sm flex items-center gap-1.5">
            {indentado ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="text-red-400 font-mono">⚠️</span>}
            <span>{indentado ? 'Código Python Válido!' : 'IndentationError: expected an indented block'}</span>
          </div>
          <p className="leading-relaxed">
            {indentado
              ? 'Em Python, o que fica dentro do if precisa estar empurrado 4 espaços para a direita. Isso substitui os blocos abraçados do Scratch!'
              : 'Sem os 4 espaços, o interpretador Python não sabe que aquele print faz parte do bloco if e interrompe o jogo imediatamente.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SIMULADOR 3: VISUALIZADOR DE LOOPS E RANGE (AULA 3)
// ============================================================
function SimuladorLoopsPython() {
  const [passoLoop, setPassoLoop] = useState(0);
  const [rodando, setRodando] = useState(false);

  const totalPassos = 4;

  const rodarLoop = () => {
    if (rodando) return;
    setRodando(true);
    setPassoLoop(0);

    let i = 0;
    const intv = setInterval(() => {
      i++;
      setPassoLoop(i);
      if (i >= totalPassos) {
        clearInterval(intv);
        setRodando(false);
      }
    }, 700);
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Repeat className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Rastreador de Loop: for i in range(4)
          </span>
        </div>
        <span className="text-[11px] font-mono text-amber-300 font-bold">
          Variável i = {passoLoop < totalPassos ? passoLoop : 3}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Bloco Python de Loop */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
          <div className="text-yellow-400 font-bold">for i in range(4):</div>
          <div className="ml-6 text-cyan-300 font-semibold">print(f&quot;Golem #{'{i+1}'} forjado!&quot;)</div>
          <div className="text-slate-500 mt-2"># range(4) gera a sequência: 0, 1, 2, 3</div>
        </div>

        {/* Golens Forjados Visualmente */}
        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2.5 text-2xl">
            {Array.from({ length: totalPassos }).map((_, idx) => (
              <div
                key={idx}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  passoLoop > idx
                    ? 'bg-amber-950/70 border-amber-500 scale-110 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 opacity-40'
                }`}
              >
                {passoLoop > idx ? '🗿' : '💤'}
              </div>
            ))}
          </div>

          <Button
            size="sm"
            onClick={rodarLoop}
            disabled={rodando}
            className="text-xs gap-1.5 bg-amber-600 hover:bg-amber-500 font-bold text-slate-950"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{rodando ? 'Forjando...' : '▶ Executar Loop range(4)'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SIMULADOR 4: A MÁQUINA DE FUNÇÕES (AULA 4)
// ============================================================
function SimuladorFuncaoPython() {
  const [ataqueBase, setAtaqueBase] = useState(40);
  const [multiplicador, setMultiplicador] = useState(2.0);

  const resultadoDano = Math.round(ataqueBase * multiplicador);

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Máquina Alquímica: Parâmetros e Retorno (def e return)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Código da Função */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
          <div className="text-purple-400 font-bold">def calcular_dano(base, mult):</div>
          <div className="ml-6 text-slate-300">dano_final = base * mult</div>
          <div className="ml-6 text-amber-400 font-bold">return dano_final</div>
          <div className="text-slate-500 pt-2"># Chamada com seus parâmetros:</div>
          <div className="text-cyan-300">dano = calcular_dano({ataqueBase}, {multiplicador})</div>
        </div>

        {/* Painel Interativo de Controles */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Parâmetro 1 (Ataque Base):</span>
              <span className="font-bold text-white">{ataqueBase}</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={ataqueBase}
              onChange={(e) => setAtaqueBase(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Parâmetro 2 (Multiplicador Crítico):</span>
              <span className="font-bold text-amber-400">{multiplicador}x</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={3.0}
              step={0.5}
              value={multiplicador}
              onChange={(e) => setMultiplicador(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-950/80 border border-indigo-700 flex items-center justify-between text-xs">
            <span className="text-slate-300">Valor Retornado (return):</span>
            <span className="text-base font-extrabold text-amber-400">{resultadoDano} DANO 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL DAS AULAS EXPLICATIVAS DE PYTHON (6 AULAS)
// ============================================================
interface AulaPython {
  id: number;
  titulo: string;
  subtitulo: string;
  duracao: string;
  icone: any;
  cor: string;
  conteudo: React.ReactNode;
}

interface AulasPythonProps {
  onIrParaLaboratorio?: (desafioId?: number) => void;
}

export function AulasPython({ onIrParaLaboratorio }: AulasPythonProps) {
  const [aulaAtiva, setAulaAtiva] = useState(1);

  const aulas: AulaPython[] = [
    {
      id: 1,
      titulo: 'Aula 1: A Ponte Mágica — Dos Blocos para o Python',
      subtitulo: 'Como a lógica que você aprendeu com blocos se traduz diretamente em código escrito.',
      duracao: '5 min de leitura + Comparador',
      icone: Code,
      cor: 'cyan',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Você já sabe programar! Só falta aprender o idioma!
            </h4>
            <p>
              Se você concluiu o módulo de blocos, você já domina <strong>algoritmos, sequências, laços e decisões</strong>.
              O Python é apenas a forma textual mais limpa e elegante do mundo para expressar essas mesmas ideias sem precisar arrastar o mouse.
            </p>
          </div>

          {/* SIMULADOR DE CONVERSÃO BLOCOS -> PYTHON */}
          <SimuladorBlocosParaPython />

          <div>
            <h4 className="text-white font-semibold text-base mb-2">As 3 Peças Básicas do Python</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-cyan-400 uppercase mb-1">1. Variáveis</div>
                <p className="text-xs text-slate-300">
                  Guardam números ou textos usando o sinal de igual: <code>heroi = &quot;Arthur&quot;</code>.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase mb-1">2. Tipos de Dados</div>
                <p className="text-xs text-slate-300">
                  Textos ficam entre aspas (<code>str</code>), números inteiros (<code>int</code>) e decimais (<code>float</code>).
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 uppercase mb-1">3. A Função print()</div>
                <p className="text-xs text-slate-300">
                  O megafone do computador: exibe mensagens no terminal para o usuário ler.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique seu primeiro código Python!</div>
              <div className="text-xs text-slate-400">Declare variáveis de RPG e imprima no terminal no Desafio 1.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(1)} className="gap-1.5 text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500">
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
      titulo: 'Aula 2: A Lei da Indentação e Condicionais (if / elif / else)',
      subtitulo: 'Em Python, o espaçamento não é mero detalhe estético — é a própria estrutura lógica!',
      duracao: '6 min de leitura + Scanner',
      icone: Split,
      cor: 'emerald',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Split className="w-4 h-4 text-emerald-400" />
              Adeus chaves &#123;&#125;, olá 4 Espaços!
            </h4>
            <p>
              Em linguagens como C ou Java, usam-se chaves para dizer o que está dentro de uma decisão.
              No Python, tudo é mais limpo: coloca-se dois pontos <code>:</code> no final da condição e empurra-se as linhas seguintes com <strong>4 espaços (tecla Tab)</strong>.
            </p>
          </div>

          {/* SIMULADOR DE INDENTAÇÃO */}
          <SimuladorIndentacao />

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique decisões com if e else!</div>
              <div className="text-xs text-slate-400">Decida se o herói sobrevive aos ataques no Desafio 2.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(2)} className="gap-1.5 text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500">
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
      titulo: 'Aula 3: Laços de Repetição em Python (for, while e range)',
      subtitulo: 'Automatize tarefas repetitivas e percorra listas de itens com elegância.',
      duracao: '6 min de leitura + Rastreador',
      icone: Repeat,
      cor: 'amber',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Repeat className="w-4 h-4 text-amber-400" />
              A Função range() é o seu Contador Automático!
            </h4>
            <p>
              Quando você quer repetir uma ação 5 vezes, basta escrever <code>for i in range(5):</code>.
              O Python conta automaticamente 0, 1, 2, 3 e 4 para você!
            </p>
          </div>

          {/* SIMULADOR DE LOOPS */}
          <SimuladorLoopsPython />

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique Loops no Desafio 3!</div>
              <div className="text-xs text-slate-400">Automatize a forja e a marcha dos heróis com loops for.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(3)} className="gap-1.5 text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500">
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
      titulo: 'Aula 4: A Forja das Funções (def, parâmetros e return)',
      subtitulo: 'Crie seus próprios feitiços reutilizáveis: receba dados e devolva resultados calculados.',
      duracao: '6 min de leitura + Máquina',
      icone: Cpu,
      cor: 'purple',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              Funções: O Princípio da Máquina Alquímica
            </h4>
            <p>
              Uma função é como uma máquina de poções: você insere ingredientes nos <strong>parâmetros</strong>,
              o código processa a receita e o comando <strong>return</strong> cospe o resultado pronto!
            </p>
          </div>

          {/* SIMULADOR DA MÁQUINA DE FUNÇÕES */}
          <SimuladorFuncaoPython />

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique Funções no Desafio 4!</div>
              <div className="text-xs text-slate-400">Implemente a função de cálculo de dano crítico.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(4)} className="gap-1.5 text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500">
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
      titulo: 'Aula 5: Coleções Arcanas: Listas [] e Dicionários {}',
      subtitulo: 'Gerencie o inventário da mochila com listas e armazene atributos completos em dicionários.',
      duracao: '7 min de leitura',
      icone: Database,
      cor: 'cyan',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              A Mochila do Aventureiro e a Ficha de RPG
            </h4>
            <p>
              Em jogos reais você nunca tem apenas uma variável. Você precisa de <strong>Listas</strong> para guardar vários itens em ordem,
              e <strong>Dicionários</strong> para associar chaves e valores (como nome, vida e mana).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-amber-400 font-bold"># Listas: colchetes [ ]</div>
              <div className="text-slate-300">mochila = [&quot;Espada&quot;, &quot;Poção&quot;, &quot;Escudo&quot;]</div>
              <div className="text-slate-300">mochila.append(&quot;Arco Élfico&quot;)</div>
              <div className="text-slate-400 text-[11px]"># Acesso pelo índice: mochila[0] é &quot;Espada&quot;</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-cyan-400 font-bold"># Dicionários: chaves &#123; &#125;</div>
              <div className="text-slate-300">heroi = &#123;</div>
              <div className="ml-4 text-slate-300">&quot;nome&quot;: &quot;Legolas&quot;,</div>
              <div className="ml-4 text-slate-300">&quot;vida&quot;: 100,</div>
              <div className="ml-4 text-slate-300">&quot;poder&quot;: 88</div>
              <div className="text-slate-300">&#125;</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique Listas e Dicionários!</div>
              <div className="text-xs text-slate-400">Manipule poções e grimórios nos Desafios 5 e 6.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(5)} className="gap-1.5 text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500">
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
      titulo: 'Aula 6: Classes e POO (Programação Orientada a Objetos)',
      subtitulo: 'Crie moldes mágicos para instanciar heróis, monstros e itens com métodos e atributos próprios.',
      duracao: '7 min de leitura',
      icone: Boxes,
      cor: 'purple',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60">
            <h4 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-purple-400" />
              O Molde dos Heróis: O que é uma Classe?
            </h4>
            <p>
              Uma <strong>classe</strong> é como a forma de bolo ou a planta baixa de um castelo.
              Ela define quais atributos todo herói terá (nome, vida, poder) e quais ações ele pode executar (métodos como <code>receber_dano()</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5 overflow-x-auto">
            <div className="text-purple-400 font-bold">class PersonagemRPG:</div>
            <div className="ml-4 text-yellow-400">def __init__(self, nome, classe, vida=100):</div>
            <div className="ml-8 text-slate-300">self.nome = nome</div>
            <div className="ml-8 text-slate-300">self.classe = classe</div>
            <div className="ml-8 text-slate-300">self.vida = vida</div>
            <div className="ml-4 text-yellow-400 pt-1">def receber_dano(self, valor):</div>
            <div className="ml-8 text-slate-300">self.vida = max(0, self.vida - valor)</div>
            <div className="ml-8 text-amber-400 font-bold">return self.vida</div>
            <div className="text-slate-500 pt-2"># Criando um personagem a partir do molde:</div>
            <div className="text-cyan-300">aragorn = PersonagemRPG(&quot;Aragorn&quot;, &quot;Guerreiro&quot;)</div>
            <div className="text-cyan-300">aragorn.receber_dano(25)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">O Desafio Supremo de POO!</div>
              <div className="text-xs text-slate-400">Modele sua classe completa no Desafio 8 do laboratório Python.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(8)} className="gap-1.5 text-xs bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500">
                <span>Ir para Desafio Final (POO)</span>
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
      {/* Seletor de Aulas (6 Lições de Python) */}
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
                  ? 'bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-600/20 text-white scale-[1.02]'
                  : 'bg-slate-900/60 border-quest-border hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${ativa ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
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
            <Badge variant="cyan">Módulo Python — Lição {aulaAtual.id} de {aulas.length}</Badge>
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

