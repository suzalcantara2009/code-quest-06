'use client';

import React, { useState } from 'react';
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
  HelpCircle,
  Play,
  RotateCw,
  Footprints,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

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
      subtitulo: 'Entenda como computadores pensam e como blocos encaixáveis funcionam como peças de Lego.',
      duracao: '5 min de leitura',
      icone: Blocks,
      cor: 'purple',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              O Computador é como um Robô que não adivinha nada!
            </h4>
            <p>
              Imagine que você peça a um amigo: <em>&ldquo;Pegue um copo de água para mim&rdquo;</em>. Seu amigo entende imediatamente o que fazer.
              Porém, se você disser isso a um robô ou computador, ele ficará paralisado! Ele não sabe o que é uma cozinha, onde fica o copo ou como abrir a torneira.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-2">O que é um Algoritmo?</h4>
            <p className="mb-3">
              Um <strong>algoritmo</strong> nada mais é do que uma <span className="text-indigo-400 font-medium">receita passo a passo</span>, finita e perfeitamente ordenada, para atingir um objetivo específico.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
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

          <div>
            <h4 className="text-white font-semibold text-base mb-2">Por que Programação em Blocos (Estilo Scratch)?</h4>
            <p className="mb-3">
              Na programação tradicional, se você esquecer uma vírgula ou uma chave <code>&#123;&#125;</code>, o código quebra com um erro misterioso de sintaxe.
              No <strong>Scratch</strong> e no nosso <strong>ScratchQuest</strong>, o código é construído visualmente:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-300 ml-1">
              <li>
                <strong className="text-white">Sem erros de digitação:</strong> Você encaixa blocos coloridos que já contêm os comandos prontos.
              </li>
              <li>
                <strong className="text-white">Conexão visual de quebra-cabeça:</strong> Os blocos só se encaixam se a lógica fizer sentido.
              </li>
              <li>
                <strong className="text-white">Cores por categoria:</strong> Azul para movimento, Âmbar para ações, Laranja para controle e Verde para lógica.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pronto para testar?</div>
              <div className="text-xs text-slate-400">Pratique o sequenciamento na primeira missão prática do laboratório.</div>
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
      duracao: '6 min de leitura',
      icone: Footprints,
      cor: 'cyan',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              O Maior Erro dos Iniciantes em Scratch!
            </h4>
            <p>
              Muitos estudantes acham que o bloco <strong>&ldquo;Girar à Direita&rdquo;</strong> faz o personagem andar para o lado direito da tela.
              <strong> Não faz!</strong> Girar apenas rotaciona a cabeça do boneco em 90 graus no mesmo lugar onde ele está.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-2">Pense pelo Ponto de Vista do Avatar</h4>
            <p className="mb-3">
              Imagine que você é o aventureiro na masmorra segurando uma tocha. Se você estiver olhando para o Norte (para cima):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-blue-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5" />
                  Bloco: Avançar 1 Passo
                </div>
                <p className="text-xs text-slate-300">
                  O personagem dá 1 passo à frente <strong>na direção para a qual ele está virado</strong> naquele instante.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-amber-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" />
                  Bloco: Girar 90° à Direita
                </div>
                <p className="text-xs text-slate-300">
                  O herói vira o corpo 90 graus no sentido horário, mas <strong>permanece no mesmo quadrado do tabuleiro</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2 text-indigo-400">
              Exemplo Prático: Fazer uma Curva em L
            </h5>
            <p className="text-xs text-slate-300 mb-3">
              Para andar 2 quadrados para frente, virar e andar mais 1 quadrado para o lado:
            </p>
            <div className="space-y-1.5 font-mono text-xs max-w-sm">
              <div className="p-2 rounded bg-blue-600/90 text-white font-semibold shadow">1. Avançar 1 passo</div>
              <div className="p-2 rounded bg-blue-600/90 text-white font-semibold shadow">2. Avançar 1 passo</div>
              <div className="p-2 rounded bg-blue-700/90 text-white font-semibold shadow">3. Girar à Direita (90°)</div>
              <div className="p-2 rounded bg-blue-600/90 text-white font-semibold shadow">4. Avançar 1 passo</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Hora de praticar curvas e ações!</div>
              <div className="text-xs text-slate-400">Acenda as tochas virando nos cantos certos da masmorra.</div>
            </div>
            {onIrParaLaboratorio && (
              <Button size="sm" onClick={() => onIrParaLaboratorio(1)} className="gap-1.5 text-xs">
                <span>Experimentar no Palco</span>
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
      duracao: '6 min de leitura',
      icone: Repeat,
      cor: 'amber',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/60">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <Repeat className="w-4 h-4 text-amber-400" />
              O Princípio do DRY: Não repita a si mesmo!
            </h4>
            <p>
              Imagine que você precise andar por um corredor comprido de 10 quadrados.
              Você prefere arrastar 10 blocos iguais de <em>&ldquo;Avançar&rdquo;</em> um embaixo do outro ou colocar apenas <strong>1 bloco de repetição</strong>?
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-2">Como Funciona o Bloco &ldquo;Repetir&rdquo;?</h4>
            <p className="mb-3">
              No Scratch, o bloco de repetição possui um formato de &ldquo;C&rdquo; que abraça os blocos que você colocar dentro dele:
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 max-w-md">
              <div className="p-2.5 rounded bg-orange-600 text-white font-bold text-xs">
                🔁 Repetir (4) vezes:
              </div>
              <div className="pl-6 space-y-1.5 border-l-4 border-orange-500 ml-2">
                <div className="p-2 rounded bg-blue-600 text-white font-semibold text-xs">Avançar 1 passo</div>
                <div className="p-2 rounded bg-amber-600 text-white font-semibold text-xs">Coletar Cristal</div>
              </div>
              <div className="p-2 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
                [Continuar o restante do programa...]
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <h5 className="text-white font-semibold text-xs mb-1">O que o computador faz nesse laço?</h5>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
              <li>Executa &ldquo;Avançar 1 passo&rdquo; e &ldquo;Coletar Cristal&rdquo; (Iteração 1)</li>
              <li>Executa novamente os mesmos dois blocos (Iteração 2)</li>
              <li>Executa novamente (Iteração 3)</li>
              <li>Executa a 4ª vez (Iteração 4)</li>
              <li>O contador atingiu 4! O robô sai do laço e executa o próximo bloco que estiver embaixo.</li>
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Pratique Loops no Desafio 3!</div>
              <div className="text-xs text-slate-400">Colete todos os cristais em sequência usando repetição.</div>
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
      duracao: '7 min de leitura',
      icone: Split,
      cor: 'emerald',
      conteudo: (
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
              <Split className="w-4 h-4 text-emerald-400" />
              O Cérebro da Programação: Escolher Caminhos
            </h4>
            <p>
              Até agora nossos algoritmos eram linhas retas previsíveis. Mas o que acontece se aparecer uma muralha ou um portão trancado no meio do caminho?
              É aqui que entram as <strong>estruturas condicionais</strong>!
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-2">A Estrutura &ldquo;SE ... ENTÃO ... SENÃO&rdquo;</h4>
            <p className="mb-3">
              Você usa essa lógica na vida real todos os dias:
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 max-w-md">
              <div className="p-2.5 rounded bg-emerald-700 text-white font-bold text-xs">
                🌿 SE (Chave Dourada no Inventário == Sim) ENTÃO:
              </div>
              <div className="pl-6 py-1 border-l-4 border-emerald-500 ml-2">
                <div className="p-2 rounded bg-amber-600 text-white font-semibold text-xs">Abaixar Ponte Levadiça</div>
              </div>
              <div className="p-2.5 rounded bg-emerald-800 text-white font-bold text-xs">
                🍂 SENÃO:
              </div>
              <div className="pl-6 py-1 border-l-4 border-emerald-600 ml-2">
                <div className="p-2 rounded bg-blue-600 text-white font-semibold text-xs">Girar e Ir pelo Atalho</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <h5 className="text-white font-semibold text-xs mb-1">Dica de Mestre para Jogos e Robótica</h5>
            <p className="text-xs text-slate-300">
              Quando combinamos <strong>Repetições</strong> com <strong>Condicionais</strong> (por exemplo: <em>&ldquo;Enquanto não chegar ao fim: Se tem parede à frente, vire; Senão, avance&rdquo;</em>),
              criamos um herói capaz de resolver qualquer labirinto sozinho!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-quest-border flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Desafio Final em Blocos!</div>
              <div className="text-xs text-slate-400">Monte o programa completo no Desafio 4 do laboratório.</div>
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
  ];

  const aulaAtual = aulas.find((a) => a.id === aulaAtiva) || aulas[0];

  return (
    <div className="space-y-6">
      {/* Seletor de Aulas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {aulas.map((aula) => {
          const Icone = aula.icone;
          const ativa = aula.id === aulaAtiva;
          return (
            <button
              key={aula.id}
              onClick={() => setAulaAtiva(aula.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                ativa
                  ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-600/20 text-white'
                  : 'bg-slate-900/60 border-quest-border hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${ativa ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  <Icone className="w-4 h-4" />
                </div>
                <Badge variant={ativa ? 'purple' : 'default'}>{aula.duracao}</Badge>
              </div>
              <div>
                <div className={`text-xs font-bold leading-tight line-clamp-1 ${ativa ? 'text-white' : 'text-slate-300'}`}>
                  Aula {aula.id}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{aula.titulo.split(':')[1]?.trim() || aula.titulo}</div>
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

