'use client';

import React, { useState } from 'react';
import {
  Zap,
  Terminal,
  MousePointerClick,
  Layers,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Eye,
  RefreshCw,
  Cpu,
  Flame,
  Shield,
  Search,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AulaJavaScriptData {
  id: number;
  titulo: string;
  subtitulo: string;
  duracao: string;
  icone: any;
  descricao: string;
  conceitoChave: string;
  equivalenteBlocos: string;
  equivalentePython: string;
}

const AULAS_JAVASCRIPT: AulaJavaScriptData[] = [
  {
    id: 1,
    titulo: '1. A Alma da Página: JavaScript Moderno',
    subtitulo: 'Variáveis (let/const), tipos dinâmicos e conexão com a lógica de Blocos e Python',
    duracao: '15 min',
    icone: Zap,
    descricao:
      'Se o HTML é o esqueleto e o CSS é a armadura, o JavaScript é a mente pensante e os reflexos do herói. Ele roda direto no navegador, calculando dano, manipulando dados e respondendo a cliques em frações de segundo.',
    conceitoChave:
      'Use let para valores que mudam e const para valores fixos. console.log() é o seu fiel oráculo de depuração.',
    equivalenteBlocos: 'Blocos [defina {xp} para (100)] e [diga "Olá"]',
    equivalentePython: 'let xp = 100 equivale a xp = 100 em Python (sem precisar tipar estaticamente).',
  },
  {
    id: 2,
    titulo: '2. Manipulação do DOM: A Mão Invisível',
    subtitulo: 'Selecionando elementos com document.querySelector e alterando texto, cores e classes',
    duracao: '20 min',
    icone: Eye,
    descricao:
      'O DOM (Document Object Model) é a representação viva da sua página em memória. Com o JavaScript, você pode localizar qualquer tag e alterar seu texto (.textContent), seu estilo (.style) ou suas classes (.classList) sem recarregar a tela.',
    conceitoChave:
      'const elemento = document.querySelector("#id") permite agarrar qualquer elemento e transformá-lo dinamicamente.',
    equivalenteBlocos: 'Bloco [mude efeito {cor} para (50)] ou [mude fantasia para {dragao}]',
    equivalentePython: 'Equivale a acessar e alterar atributos de um objeto na memória: card.titulo = "Novo"',
  },
  {
    id: 3,
    titulo: '3. O Guardião dos Eventos: addEventListener',
    subtitulo: 'Ouvindo cliques, digitação e teclado para dar vida e reatividade ao jogo',
    duracao: '20 min',
    icone: MousePointerClick,
    descricao:
      'Uma página sem eventos é como uma estátua de pedra. Com addEventListener, você ensina o navegador a "ficar de guarda" aguardando ações do jogador, como um clique de mouse ou uma tecla pressionada.',
    conceitoChave:
      'botao.addEventListener("click", () => { ... }) dispara a função sempre que o botão for acionado.',
    equivalenteBlocos: 'Bloco amarelo [quando este ator for clicado]',
    equivalentePython: 'Equivale aos manipuladores de eventos de bibliotecas gráficas como Pygame (pygame.event.get()).',
  },
  {
    id: 4,
    titulo: '4. A Forja Funcional de Arrays: filter, map e reduce',
    subtitulo: 'Transformação limpa e sem efeitos colaterais em listas de heróis e inventários',
    duracao: '25 min',
    icone: Layers,
    descricao:
      'Em vez de usar laços for tradicionais cheios de variáveis temporárias, o JavaScript moderno oferece métodos poderosos e expressivos: .filter() para selecionar itens, .map() para transformar dados e .reduce() para agregar totais.',
    conceitoChave:
      'Métodos funcionais não alteram o array original, retornando uma nova coleção tratada de forma declarativa.',
    equivalenteBlocos: 'Percorrer listas com [para cada {item} em (inventario)]',
    equivalentePython: 'Equivale às List Comprehensions do Python: [h for h in herois if h.classe == "Mago"]',
  },
  {
    id: 5,
    titulo: '5. A Invocação Assíncrona: async, await & fetch',
    subtitulo: 'Consultando APIs e oráculos remotos sem travar a interface do jogador',
    duracao: '25 min',
    icone: Clock,
    descricao:
      'O navegador executa tarefas em uma única thread principal (Single Thread). Se você fizesse uma busca na internet de forma travada, a tela congelaria. Com Promises e async/await, a requisição voa pela rede enquanto o jogo continua fluindo normalmente.',
    conceitoChave:
      'const res = await fetch(url) pausa apenas a função assíncrona até a resposta do servidor chegar.',
    equivalenteBlocos: 'Bloco [espere até <resposta do oráculo>] sem paralisar o palco',
    equivalentePython: 'Equivale à biblioteca requests e sintaxe assíncrona asyncio do Python.',
  },
  {
    id: 6,
    titulo: '6. Classes & Orientação a Objetos no JS',
    subtitulo: 'Molde de heróis com constructor, atributos de estado e métodos de batalha',
    duracao: '20 min',
    icone: Cpu,
    descricao:
      'Com a sintaxe class do JavaScript moderno, você pode criar moldes perfeitos de personagens, itens e inimigos. Cada instância criada com new herda atributos e comportamentos próprios.',
    conceitoChave:
      'class Guerreiro { constructor(nome) { this.nome = nome; } atacar() { return ...; } }',
    equivalenteBlocos: 'Criação de clones de atores com variáveis locais "só para este ator"',
    equivalentePython: 'Idêntico ao class Personagem: def __init__(self, nome): self.nome = nome',
  },
];

interface AulasJavaScriptProps {
  onIrParaLaboratorio?: (desafioId?: number) => void;
}

export function AulasJavaScript({ onIrParaLaboratorio }: AulasJavaScriptProps) {
  const [aulaAtualId, setAulaAtualId] = useState<number>(1);

  // Simulador 1: Variáveis & Tipos
  const [nomeHeroi, setNomeHeroi] = useState('Arthur');
  const [nivelHeroi, setNivelHeroi] = useState(5);
  const [logConsole, setLogConsole] = useState<string[]>([
    '>>> const reino = "Avalon";',
    '>>> let heroi = "Arthur";',
    '>>> let nivel = 5;',
    '>>> console.log(`${heroi} alcançou o nível ${nivel}!`);',
    'Arthur alcançou o nível 5!',
  ]);

  // Simulador 2: Manipulação do DOM
  const [cardTitulo, setCardTitulo] = useState('Guerreiro da Luz');
  const [cardHp, setCardHp] = useState(100);
  const [cardElemento, setCardElemento] = useState<'fogo' | 'gelo' | 'raio'>('fogo');
  const [cardGlow, setCardGlow] = useState(false);

  // Simulador 3: Eventos (addEventListener)
  const [contadorCliques, setContadorCliques] = useState(0);
  const [ultimoEvento, setUltimoEvento] = useState<string>('Nenhum evento disparado ainda');
  const [manaPoder, setManaPoder] = useState(30);

  // Simulador 4: Arrays (filter, map, reduce)
  const [filtroArray, setFiltroArray] = useState<'todos' | 'magos' | 'dobrar' | 'total'>('todos');

  // Simulador 5: Async / Await & Fetch
  const [statusFetch, setStatusFetch] = useState<'idle' | 'carregando' | 'sucesso'>('idle');
  const [dadoApi, setDadoApi] = useState<any>(null);

  // Simulador 6: Classes & POO
  const [nomeClasseHeroi, setNomeClasseHeroi] = useState('Geralt');
  const [tipoProfissao, setTipoProfissao] = useState<'Bruxo' | 'Cavaleiro' | 'Arqueira'>('Bruxo');
  const [heroisInstanciados, setHeroisInstanciados] = useState<
    { id: number; nome: string; profissao: string; hp: number; poder: number }[]
  >([
    { id: 1, nome: 'Geralt', profissao: 'Bruxo', hp: 120, poder: 85 },
  ]);

  const aulaAtual = AULAS_JAVASCRIPT.find((a) => a.id === aulaAtualId) || AULAS_JAVASCRIPT[0];

  const handleSubirNivel = () => {
    const novoNivel = nivelHeroi + 1;
    setNivelHeroi(novoNivel);
    setLogConsole((prev) => [
      ...prev,
      `>>> heroi.subirNivel(); // novo nível: ${novoNivel}`,
      `✨ ${nomeHeroi} subiu para o nível ${novoNivel}! (+15 de Poder)`,
    ]);
  };

  const dispararInvocacao = () => {
    setContadorCliques((c) => c + 1);
    setManaPoder((m) => Math.min(100, m + 10));
    setUltimoEvento(`Clique #${contadorCliques + 1} disparado no botão (#btn-invocar) às ${new Date().toLocaleTimeString()}`);
  };

  const simularRequisicaoAssincrona = () => {
    setStatusFetch('carregando');
    setDadoApi(null);

    setTimeout(() => {
      setStatusFetch('sucesso');
      setDadoApi({
        nome: 'Pergaminho de Shenlong',
        raridade: 'Lendário',
        poder: 980,
        origem: 'api.codequest.dev/oraculo/v1',
        statusHttp: '200 OK',
      });
    }, 1200);
  };

  const instanciarNovoHeroi = () => {
    if (!nomeClasseHeroi.trim()) return;
    const baseHp = tipoProfissao === 'Cavaleiro' ? 150 : tipoProfissao === 'Bruxo' ? 110 : 90;
    const basePoder = tipoProfissao === 'Bruxo' ? 95 : tipoProfissao === 'Arqueira' ? 88 : 75;

    setHeroisInstanciados((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: nomeClasseHeroi,
        profissao: tipoProfissao,
        hp: baseHp,
        poder: basePoder,
      },
    ]);
    setNomeClasseHeroi('');
  };

  return (
    <div className="space-y-6">
      {/* Navegador Superior de Aulas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {AULAS_JAVASCRIPT.map((aula) => {
          const Icone = aula.icone;
          const selecionada = aula.id === aulaAtualId;
          return (
            <button
              key={aula.id}
              onClick={() => setAulaAtualId(aula.id)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                selecionada
                  ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20 text-white'
                  : 'bg-slate-900/60 border-quest-border hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icone className={`w-4 h-4 ${selecionada ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {aula.duracao}
                </span>
              </div>
              <div className="text-xs font-bold truncate">Aula {aula.id}</div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">{aula.titulo.split(':')[0].replace(/^\d+\.\s*/, '')}</div>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Aula Selecionada */}
      <Card className="border-quest-border bg-slate-900/90 shadow-xl overflow-hidden">
        <CardHeader className="border-b border-quest-border pb-4 bg-slate-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="warning">Módulo 4: JavaScript</Badge>
                <Badge variant="cyan">Aula Interativa {aulaAtual.id} de 6</Badge>
              </div>
              <CardTitle className="text-xl sm:text-2xl text-white">{aulaAtual.titulo}</CardTitle>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{aulaAtual.subtitulo}</p>
            </div>
            {onIrParaLaboratorio && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onIrParaLaboratorio(aulaAtual.id)}
                className="text-xs gap-1.5 shrink-0 border-amber-500/40 text-amber-400 hover:bg-amber-950/40"
              >
                <span>Praticar no Laboratório</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Caixa de Contexto Pedagógico */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-sm leading-relaxed space-y-3">
            <p>{aulaAtual.descricao}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-indigo-300">
                <span className="font-bold block mb-0.5">🧩 Como era em Blocos:</span>
                <span>{aulaAtual.equivalenteBlocos}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-900/60 text-cyan-300">
                <span className="font-bold block mb-0.5">🐍 Como era em Python:</span>
                <span>{aulaAtual.equivalentePython}</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 1: VARIÁVEIS & CONSOLE */}
          {/* ========================================================= */}
          {aulaAtual.id === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> Mini-Simulador: Console e Variáveis Reativas
                </span>
                <span className="text-[11px] text-slate-400">Edite as variáveis e assista ao console reagir</span>
              </div>

              {/* Controles de Variáveis */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Nome do Herói (let):</span>
                  <input
                    type="text"
                    value={nomeHeroi}
                    onChange={(e) => {
                      setNomeHeroi(e.target.value);
                      setLogConsole((prev) => [...prev, `heroi = "${e.target.value}";`]);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Nível de XP (let):</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-400">{nivelHeroi}</span>
                    <Button size="sm" variant="outline" onClick={handleSubirNivel} className="text-xs py-1 h-auto">
                      + Subir Nível
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-semibold block mb-1">Constante (const):</span>
                  <span className="text-xs font-mono text-emerald-400 bg-slate-900 px-2 py-1 rounded border border-slate-700 inline-block">
                    const REINO = &quot;Avalon&quot;;
                  </span>
                </div>
              </div>

              {/* Console Interativo */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300">
                <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>Console do Navegador (F12)</span>
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {logConsole.slice(-6).map((log, i) => (
                    <div
                      key={i}
                      className={log.startsWith('>>>') ? 'text-slate-500' : 'text-amber-300 font-semibold'}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 2: MANIPULAÇÃO DO DOM */}
          {/* ========================================================= */}
          {aulaAtual.id === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Mini-Simulador: A Mão Invisível do DOM
                </span>
                <span className="text-[11px] text-slate-400">
                  Execute instruções JS para alterar elementos visuais diretamente
                </span>
              </div>

              {/* Ações de Manipulação */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setCardTitulo('Mago Arquimago')}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400 text-left text-xs font-mono text-slate-300 transition"
                >
                  <span className="text-amber-400 font-bold block mb-0.5">.textContent</span>
                  Mudar Nome do Card
                </button>
                <button
                  onClick={() => setCardHp((h) => Math.min(100, h + 20))}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-400 text-left text-xs font-mono text-slate-300 transition"
                >
                  <span className="text-emerald-400 font-bold block mb-0.5">.style.width</span>
                  Curar Barra de Vida
                </button>
                <button
                  onClick={() =>
                    setCardElemento((prev) => (prev === 'fogo' ? 'gelo' : prev === 'gelo' ? 'raio' : 'fogo'))
                  }
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left text-xs font-mono text-slate-300 transition"
                >
                  <span className="text-cyan-400 font-bold block mb-0.5">.setAttribute()</span>
                  Trocar Elemento
                </button>
                <button
                  onClick={() => setCardGlow(!cardGlow)}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-purple-400 text-left text-xs font-mono text-slate-300 transition"
                >
                  <span className="text-purple-400 font-bold block mb-0.5">.classList.toggle()</span>
                  {cardGlow ? 'Remover Brilho' : 'Ativar Néon'}
                </button>
              </div>

              {/* Elemento do DOM Sendo Manipulado */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center">
                <div
                  id="card-heroi-dom"
                  className={`w-full max-w-sm rounded-xl p-5 border-2 transition-all duration-300 ${
                    cardGlow
                      ? 'shadow-2xl shadow-purple-500/50 border-purple-400 bg-slate-900'
                      : 'border-slate-700 bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">
                      {cardElemento === 'fogo' ? '🔥' : cardElemento === 'gelo' ? '❄️' : '⚡'}
                    </span>
                    <Badge variant={cardElemento === 'fogo' ? 'danger' : cardElemento === 'gelo' ? 'cyan' : 'warning'}>
                      {cardElemento.toUpperCase()}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{cardTitulo}</h3>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300 font-semibold">
                      <span>Pontos de Vida (HP):</span>
                      <span className="text-emerald-400">{cardHp} / 100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${cardHp}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono text-slate-400">
                  Código executado: document.querySelector(&quot;#card-heroi-dom&quot;)...
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 3: EVENTOS (addEventListener) */}
          {/* ========================================================= */}
          {aulaAtual.id === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <MousePointerClick className="w-4 h-4" /> Mini-Simulador: Escuta de Interações
                </span>
                <span className="text-[11px] text-slate-400">
                  Clique no botão para acionar o ouvinte addEventListener
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Botão Interativo com Escuta */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center space-y-4">
                  <button
                    id="btn-invocar-evento"
                    onClick={dispararInvocacao}
                    className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-slate-950 font-bold text-sm shadow-lg shadow-amber-600/30 transition flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Canalizar Energia Arcana (+10)</span>
                  </button>

                  <div className="w-full max-w-xs space-y-1">
                    <div className="flex justify-between text-xs text-slate-300 font-semibold">
                      <span>Energia Acumulada:</span>
                      <span className="text-amber-400">{manaPoder} / 100</span>
                    </div>
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                        style={{ width: `${manaPoder}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Log do EventListener */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1">
                      Event Listener Registrado
                    </div>
                    <pre className="text-amber-300 leading-relaxed mb-3">
{`const botao = document.querySelector("#btn-invocar");

botao.addEventListener("click", (evento) => {
  energia += 10;
  console.log("Evento click capturado!");
});`}
                    </pre>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                    <span className="text-amber-400 font-bold block mb-0.5">Último disparo:</span>
                    <span>{ultimoEvento}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 4: ARRAYS (filter, map, reduce) */}
          {/* ========================================================= */}
          {aulaAtual.id === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Mini-Simulador: A Forja Funcional de Arrays
                </span>
                <span className="text-[11px] text-slate-400">Alterne os métodos para ver o array se transformar</span>
              </div>

              {/* Botões dos Métodos */}
              <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => setFiltroArray('todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    filtroArray === 'todos' ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Array Original (5 Heróis)
                </button>
                <button
                  onClick={() => setFiltroArray('magos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    filtroArray === 'magos' ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  .filter(h =&gt; h.classe === &apos;Mago&apos;)
                </button>
                <button
                  onClick={() => setFiltroArray('dobrar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    filtroArray === 'dobrar' ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  .map(h =&gt; (&#123; ...h, poder: h.poder * 2 &#125;))
                </button>
                <button
                  onClick={() => setFiltroArray('total')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    filtroArray === 'total' ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  .reduce((total, h) =&gt; total + h.poder, 0)
                </button>
              </div>

              {/* Renderização da Coleção */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
                {filtroArray === 'total' ? (
                  <div className="p-8 text-center space-y-2">
                    <span className="text-3xl font-extrabold text-amber-400">448 Pontos</span>
                    <p className="text-xs text-slate-400">
                      Soma total ponderada calculada instantaneamente através do método .reduce()!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { nome: 'Gandalf', classe: 'Mago', poder: 95 },
                      { nome: 'Aragorn', classe: 'Guerreiro', poder: 90 },
                      { nome: 'Raistlin', classe: 'Mago', poder: 85 },
                      { nome: 'Legolas', classe: 'Arqueiro', poder: 88 },
                      { nome: 'Hermione', classe: 'Mago', poder: 90 },
                    ]
                      .filter((h) => (filtroArray === 'magos' ? h.classe === 'Mago' : true))
                      .map((h) => ({
                        ...h,
                        poder: filtroArray === 'dobrar' ? h.poder * 2 : h.poder,
                      }))
                      .map((heroi, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{heroi.nome}</div>
                            <div className="text-[11px] text-slate-400">{heroi.classe}</div>
                          </div>
                          <Badge variant="warning">{heroi.poder} Poder</Badge>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 5: ASYNC / AWAIT & FETCH */}
          {/* ========================================================= */}
          {aulaAtual.id === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Mini-Simulador: A Invocação Assíncrona
                </span>
                <span className="text-[11px] text-slate-400">
                  Consulte a API e observe o fluxo sem travar o navegador
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gatilho da Requisição */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center space-y-4">
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={statusFetch === 'carregando'}
                    onClick={simularRequisicaoAssincrona}
                    className="text-xs gap-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
                  >
                    {statusFetch === 'carregando' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Aguardando Oráculo (await)...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>Disparar fetch(&apos;api/oraculo&apos;)</span>
                      </>
                    )}
                  </Button>

                  {/* Estado da Promessa */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Estado da Promise:</span>
                    {statusFetch === 'idle' && <Badge variant="default">Idle (Em Espera)</Badge>}
                    {statusFetch === 'carregando' && <Badge variant="warning">Pending (Carregando...)</Badge>}
                    {statusFetch === 'sucesso' && <Badge variant="success">Fulfilled (200 OK)</Badge>}
                  </div>
                </div>

                {/* Resposta Recebida */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300">
                  <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
                    <span>JSON Retornado da Nuvem</span>
                    <span className="text-emerald-400">{dadoApi ? dadoApi.statusHttp : 'Nenhuma resposta'}</span>
                  </div>
                  {dadoApi ? (
                    <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
                      {JSON.stringify(dadoApi, null, 2)}
                    </pre>
                  ) : (
                    <div className="text-slate-600 italic py-6 text-center">
                      Clique no botão para disparar a invocação assíncrona.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 6: CLASSES & POO */}
          {/* ========================================================= */}
          {aulaAtual.id === 6 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Mini-Simulador: A Fábrica de Campeões (POO)
                </span>
                <span className="text-[11px] text-slate-400">Instancie heróis a partir do molde da classe</span>
              </div>

              {/* Construtor de Instâncias */}
              <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <input
                  type="text"
                  placeholder="Nome do Herói..."
                  value={nomeClasseHeroi}
                  onChange={(e) => setNomeClasseHeroi(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 flex-1 min-w-[140px]"
                />

                <div className="flex items-center gap-1">
                  {(['Bruxo', 'Cavaleiro', 'Arqueira'] as const).map((prof) => (
                    <button
                      key={prof}
                      onClick={() => setTipoProfissao(prof)}
                      className={`px-2.5 py-1 rounded text-xs font-bold border transition ${
                        tipoProfissao === prof
                          ? 'bg-amber-600 text-slate-950 border-amber-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {prof}
                    </button>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={instanciarNovoHeroi}
                  className="text-xs gap-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
                >
                  <span>new Heroi()</span>
                </Button>
              </div>

              {/* Heróis Instanciados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {heroisInstanciados.map((h) => (
                  <div
                    key={h.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-amber-500 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{h.nome}</span>
                      <Badge variant="warning">{h.profissao}</Badge>
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-0.5">
                      <div>Vida Base: <span className="text-emerald-400 font-bold">{h.hp} HP</span></div>
                      <div>Poder de Ataque: <span className="text-amber-400 font-bold">{h.poder}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rodapé com Navegação Entre Aulas */}
          <div className="flex items-center justify-between pt-4 border-t border-quest-border">
            <Button
              size="sm"
              variant="outline"
              disabled={aulaAtualId === 1}
              onClick={() => setAulaAtualId((prev) => Math.max(1, prev - 1))}
              className="text-xs gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Aula Anterior</span>
            </Button>

            <span className="text-xs text-slate-400 font-semibold">
              Aula {aulaAtualId} de {AULAS_JAVASCRIPT.length}
            </span>

            {aulaAtualId < AULAS_JAVASCRIPT.length ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setAulaAtualId((prev) => Math.min(AULAS_JAVASCRIPT.length, prev + 1))}
                className="text-xs gap-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
              >
                <span>Próxima Aula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : onIrParaLaboratorio ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onIrParaLaboratorio(1)}
                className="text-xs gap-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
              >
                <span>Ir para o Laboratório JS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

