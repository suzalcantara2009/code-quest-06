'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
  Footprints,
  RotateCw,
  RotateCcw as RotateLeft,
  Flame,
  Gem,
  Compass,
  Trophy,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Tipos de blocos estilo Scratch
export type BlockType =
  | 'avancar'
  | 'avancar_2'
  | 'girar_direita'
  | 'girar_esquerda'
  | 'acender_tocha'
  | 'coletar_cristal'
  | 'repetir_2_avancar'
  | 'repetir_3_avancar'
  | 'repetir_coleta';

export interface ScratchBlock {
  id: string;
  type: BlockType;
  label: string;
  category: 'movimento' | 'acao' | 'controle';
}

// Definição dos blocos disponíveis na Paleta Scratch
const PALETA_BLOCOS: { type: BlockType; label: string; category: 'movimento' | 'acao' | 'controle' }[] = [
  // Movimento (Azul)
  { type: 'avancar', label: 'Avançar 1 passo', category: 'movimento' },
  { type: 'avancar_2', label: 'Avançar 2 passos', category: 'movimento' },
  { type: 'girar_direita', label: 'Girar 90° à Direita ↷', category: 'movimento' },
  { type: 'girar_esquerda', label: 'Girar 90° à Esquerda ↶', category: 'movimento' },

  // Ações RPG (Âmbar/Amarelo)
  { type: 'acender_tocha', label: 'Acender Tocha 🔥', category: 'acao' },
  { type: 'coletar_cristal', label: 'Coletar Cristal 💎', category: 'acao' },

  // Controle & Repetição (Laranja vivo)
  { type: 'repetir_2_avancar', label: '🔁 Repetir 2x [ Avançar ]', category: 'controle' },
  { type: 'repetir_3_avancar', label: '🔁 Repetir 3x [ Avançar ]', category: 'controle' },
  { type: 'repetir_coleta', label: '🔁 Repetir 3x [ Avançar + Coletar ]', category: 'controle' },
];

// Configuração dos 4 Níveis / Desafios Pedagógicos
interface DesafioConfig {
  id: number;
  titulo: string;
  descricao: string;
  objetivo: string;
  tamanho: number; // grid NxN (ex: 5x5 ou 6x6)
  heroiInicio: { x: number; y: number; dir: number }; // dir: 0: Cima, 1: Direita, 2: Baixo, 3: Esquerda
  paredes: { x: number; y: number }[];
  tochas: { x: number; y: number }[];
  cristais: { x: number; y: number }[];
  portal: { x: number; y: number };
  blocosSugeridos: BlockType[];
  xp: number;
}

const DESAFIOS: DesafioConfig[] = [
  {
    id: 1,
    titulo: 'Desafio 1: A Trilha das Tochas',
    descricao: 'Acenda as 2 tochas sagradas e alcance o portal místico usando sequenciamento simples.',
    objetivo: 'Acender todas as tochas e entrar no portal.',
    tamanho: 5,
    heroiInicio: { x: 0, y: 0, dir: 1 }, // Começa em (0,0) olhando para Direita
    paredes: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    tochas: [
      { x: 0, y: 2 },
      { x: 2, y: 4 },
    ],
    cristais: [],
    portal: { x: 4, y: 4 },
    blocosSugeridos: ['avancar_2', 'acender_tocha', 'avancar_2', 'girar_direita', 'avancar_2', 'acender_tocha', 'avancar_2'],
    xp: 20,
  },
  {
    id: 2,
    titulo: 'Desafio 2: A Curva do Guardião',
    descricao: 'Contorne as muralhas do castelo usando giros precisos e acione o portal final.',
    objetivo: 'Desviar da parede com giros de 90° e alcançar o portal sem bater.',
    tamanho: 5,
    heroiInicio: { x: 0, y: 1, dir: 1 },
    paredes: [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ],
    tochas: [{ x: 2, y: 3 }],
    cristais: [{ x: 4, y: 1 }],
    portal: { x: 4, y: 4 },
    blocosSugeridos: ['avancar', 'girar_direita', 'avancar_2', 'acender_tocha', 'girar_esquerda'],
    xp: 25,
  },
  {
    id: 3,
    titulo: 'Desafio 3: O Labirinto dos Cristais',
    descricao: 'Utilize o bloco de repetição para percorrer o corredor e coletar todos os 3 cristais mágicos.',
    objetivo: 'Coletar os 3 cristais e chegar ao portal de forma otimizada com loops.',
    tamanho: 5,
    heroiInicio: { x: 0, y: 2, dir: 1 },
    paredes: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ],
    tochas: [],
    cristais: [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ],
    portal: { x: 4, y: 2 },
    blocosSugeridos: ['repetir_coleta', 'avancar'],
    xp: 30,
  },
  {
    id: 4,
    titulo: 'Desafio 4: A Forja do Autômato',
    descricao: 'O grande teste: colete os cristais de energia, acenda a forja e abra o portal do golem!',
    objetivo: 'Coletar os cristais, acender a tocha da forja e alcançar o portal.',
    tamanho: 6,
    heroiInicio: { x: 0, y: 0, dir: 1 },
    paredes: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
    ],
    tochas: [{ x: 2, y: 2 }],
    cristais: [
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 2, y: 4 },
    ],
    portal: { x: 5, y: 5 },
    blocosSugeridos: ['avancar_2', 'girar_direita', 'coletar_cristal', 'avancar', 'acender_tocha'],
    xp: 40,
  },
];

interface ScratchBlockEditorProps {
  desafioInicialId?: number;
  onConcluirDesafio?: (desafioId: number, xp: number) => void;
}

export function ScratchBlockEditor({ desafioInicialId = 1, onConcluirDesafio }: ScratchBlockEditorProps) {
  const [desafioId, setDesafioId] = useState(desafioInicialId);
  const desafio = DESAFIOS.find((d) => d.id === desafioId) || DESAFIOS[0];

  // Workspace de blocos montado pelo estudante
  const [scriptBlocos, setScriptBlocos] = useState<ScratchBlock[]>([]);

  // Estado do Palco de Simulação (Grid)
  const [posHeroi, setPosHeroi] = useState({ x: 0, y: 0, dir: 1 });
  const [tochasAcesas, setTochasAcesas] = useState<string[]>([]);
  const [cristaisColetados, setCristaisColetados] = useState<string[]>([]);
  const [emExecucao, setEmExecucao] = useState(false);
  const [blocoExecutandoId, setBlocoExecutandoId] = useState<string | null>(null);
  const [mensagemStatus, setMensagemStatus] = useState<string | null>(null);
  const [statusTipo, setStatusTipo] = useState<'info' | 'sucesso' | 'erro'>('info');
  const [modalVitoria, setModalVitoria] = useState(false);
  const [velocidade, setVelocidade] = useState<'normal' | 'rapida'>('normal');

  const reiniciarPalco = React.useCallback(() => {
    setPosHeroi({ ...desafio.heroiInicio });
    setTochasAcesas([]);
    setCristaisColetados([]);
    setEmExecucao(false);
    setBlocoExecutandoId(null);
    setMensagemStatus('Monte seu algoritmo com os blocos e clique na Bandeira Verde para testar!');
    setStatusTipo('info');
  }, [desafio]);

  // Inicializar o palco quando mudar de desafio
  useEffect(() => {
    reiniciarPalco();
    setScriptBlocos([]);
  }, [reiniciarPalco]);

  // Adicionar bloco da paleta ao script
  const adicionarBloco = (tipo: BlockType) => {
    if (emExecucao) return;
    const modelo = PALETA_BLOCOS.find((b) => b.type === tipo);
    if (!modelo) return;

    const novoBloco: ScratchBlock = {
      id: `${tipo}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type: tipo,
      label: modelo.label,
      category: modelo.category,
    };

    setScriptBlocos((prev) => [...prev, novoBloco]);
  };

  // Remover bloco do script
  const removerBloco = (id: string) => {
    if (emExecucao) return;
    setScriptBlocos((prev) => prev.filter((b) => b.id !== id));
  };

  // Mover bloco para cima ou para baixo
  const moverBloco = (index: number, direcao: 'cima' | 'baixo') => {
    if (emExecucao) return;
    const novoIndex = direcao === 'cima' ? index - 1 : index + 1;
    if (novoIndex < 0 || novoIndex >= scriptBlocos.length) return;

    setScriptBlocos((prev) => {
      const clone = [...prev];
      const temp = clone[index];
      clone[index] = clone[novoIndex];
      clone[novoIndex] = temp;
      return clone;
    });
  };

  // Carregar blocos de exemplo recomendados para a fase
  const carregarExemplo = () => {
    if (emExecucao) return;
    const blocosCarregados: ScratchBlock[] = desafio.blocosSugeridos.map((tipo, idx) => {
      const modelo = PALETA_BLOCOS.find((b) => b.type === tipo)!;
      return {
        id: `exemplo_${tipo}_${idx}_${Date.now()}`,
        type: tipo,
        label: modelo.label,
        category: modelo.category,
      };
    });
    setScriptBlocos(blocosCarregados);
  };

  // Interpretador / Executor passo a passo dos blocos estilo Scratch
  const executarAlgoritmo = async () => {
    if (emExecucao || scriptBlocos.length === 0) return;

    // Resetar posições antes de começar a execução
    let x = desafio.heroiInicio.x;
    let y = desafio.heroiInicio.y;
    let dir = desafio.heroiInicio.dir;
    let tochas: string[] = [];
    let cristais: string[] = [];

    setPosHeroi({ x, y, dir });
    setTochasAcesas([]);
    setCristaisColetados([]);
    setEmExecucao(true);
    setMensagemStatus('Executando o algoritmo de blocos passo a passo...');
    setStatusTipo('info');

    const delayTempo = velocidade === 'rapida' ? 250 : 500;
    const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // Vetores de direção: 0: Cima (y-1), 1: Direita (x+1), 2: Baixo (y+1), 3: Esquerda (x-1)
    const deltas = [
      { dx: 0, dy: -1 }, // Cima
      { dx: 1, dy: 0 },  // Direita
      { dx: 0, dy: 1 },  // Baixo
      { dx: -1, dy: 0 }, // Esquerda
    ];

    let bateuParede = false;

    // Função interna para avançar 1 passo com colisão
    const darUmPasso = () => {
      const nx = x + deltas[dir].dx;
      const ny = y + deltas[dir].dy;

      // Verificar limites do tabuleiro
      if (nx < 0 || nx >= desafio.tamanho || ny < 0 || ny >= desafio.tamanho) {
        bateuParede = true;
        return;
      }

      // Verificar colisão com paredes
      const temParede = desafio.paredes.some((p) => p.x === nx && p.y === ny);
      if (temParede) {
        bateuParede = true;
        return;
      }

      x = nx;
      y = ny;
      setPosHeroi({ x, y, dir });
    };

    // Percorrer cada bloco do script
    for (let i = 0; i < scriptBlocos.length; i++) {
      const bloco = scriptBlocos[i];
      setBlocoExecutandoId(bloco.id);

      switch (bloco.type) {
        case 'avancar':
          darUmPasso();
          break;

        case 'avancar_2':
          darUmPasso();
          if (!bateuParede) {
            await esperar(delayTempo / 2);
            darUmPasso();
          }
          break;

        case 'girar_direita':
          dir = (dir + 1) % 4;
          setPosHeroi({ x, y, dir });
          break;

        case 'girar_esquerda':
          dir = (dir + 3) % 4;
          setPosHeroi({ x, y, dir });
          break;

        case 'acender_tocha': {
          const chave = `${x},${y}`;
          const ehPosicaoTocha = desafio.tochas.some((t) => t.x === x && t.y === y);
          if (ehPosicaoTocha && !tochas.includes(chave)) {
            tochas.push(chave);
            setTochasAcesas([...tochas]);
          }
          break;
        }

        case 'coletar_cristal': {
          const chave = `${x},${y}`;
          const ehPosicaoCristal = desafio.cristais.some((c) => c.x === x && c.y === y);
          if (ehPosicaoCristal && !cristais.includes(chave)) {
            cristais.push(chave);
            setCristaisColetados([...cristais]);
          }
          break;
        }

        case 'repetir_2_avancar':
          for (let k = 0; k < 2 && !bateuParede; k++) {
            darUmPasso();
            await esperar(delayTempo / 2);
          }
          break;

        case 'repetir_3_avancar':
          for (let k = 0; k < 3 && !bateuParede; k++) {
            darUmPasso();
            await esperar(delayTempo / 2);
          }
          break;

        case 'repetir_coleta':
          for (let k = 0; k < 3 && !bateuParede; k++) {
            darUmPasso();
            const chave = `${x},${y}`;
            if (desafio.cristais.some((c) => c.x === x && c.y === y) && !cristais.includes(chave)) {
              cristais.push(chave);
              setCristaisColetados([...cristais]);
            }
            await esperar(delayTempo / 2);
          }
          break;
      }

      await esperar(delayTempo);

      if (bateuParede) {
        setBlocoExecutandoId(null);
        setEmExecucao(false);
        setMensagemStatus('💥 Ops! O herói colidiu com uma parede ou saiu do mapa! Ajuste os giros do algoritmo.');
        setStatusTipo('erro');
        return;
      }
    }

    setBlocoExecutandoId(null);
    setEmExecucao(false);

    // Validação final de vitória
    const chegouPortal = x === desafio.portal.x && y === desafio.portal.y;
    const acendeuTodasTochas = desafio.tochas.length === 0 || tochas.length === desafio.tochas.length;
    const coletouTodosCristais = desafio.cristais.length === 0 || cristais.length === desafio.cristais.length;

    if (chegouPortal && acendeuTodasTochas && coletouTodosCristais) {
      setMensagemStatus('🎉 Vitória! Seu algoritmo executou todas as ações com maestria e abriu o portal!');
      setStatusTipo('sucesso');
      setModalVitoria(true);

      // Salvar conclusão no localStorage
      try {
        const salvas = localStorage.getItem('codequest_missoes_concluidas');
        const ids: number[] = salvas ? JSON.parse(salvas) : [];
        if (!ids.includes(desafio.id)) {
          ids.push(desafio.id);
          localStorage.setItem('codequest_missoes_concluidas', JSON.stringify(ids));
        }
      } catch (e) {}

      if (onConcluirDesafio) {
        onConcluirDesafio(desafio.id, desafio.xp);
      }
    } else if (!chegouPortal) {
      setMensagemStatus('Quase lá! O herói executou todos os blocos, mas não alcançou o Portal mágico de saída.');
      setStatusTipo('erro');
    } else if (!acendeuTodasTochas) {
      setMensagemStatus(`O herói chegou ao portal, mas faltou acender ${desafio.tochas.length - tochas.length} tocha(s)!`);
      setStatusTipo('erro');
    } else if (!coletouTodosCristais) {
      setMensagemStatus(`Faltou coletar ${desafio.cristais.length - cristais.length} cristal(is) no percurso!`);
      setStatusTipo('erro');
    }
  };

  const getSetaHeroi = (dir: number) => {
    switch (dir) {
      case 0:
        return '▲'; // Cima
      case 1:
        return '▶'; // Direita
      case 2:
        return '▼'; // Baixo
      case 3:
        return '◀'; // Esquerda
      default:
        return '▶';
    }
  };

  const getEstiloBloco = (category: 'movimento' | 'acao' | 'controle', isRunning: boolean) => {
    let base = 'font-semibold text-white shadow-md rounded-xl py-2 px-3 flex items-center justify-between transition-all ';
    if (isRunning) {
      base += 'ring-4 ring-yellow-400 scale-[1.03] z-10 ';
    }
    switch (category) {
      case 'movimento':
        return base + 'bg-blue-600 hover:bg-blue-500 border border-blue-400/40';
      case 'acao':
        return base + 'bg-amber-600 hover:bg-amber-500 border border-amber-400/40';
      case 'controle':
        return base + 'bg-orange-600 hover:bg-orange-500 border border-orange-400/40';
      default:
        return base + 'bg-indigo-600 border border-indigo-400/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Seletor dos 4 Desafios */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-quest-border">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-white">Fases do Laboratório:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {DESAFIOS.map((d) => (
            <button
              key={d.id}
              onClick={() => !emExecucao && setDesafioId(d.id)}
              disabled={emExecucao}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                d.id === desafioId
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Fase {d.id}</span>
              <span className="text-[10px] text-amber-300">+{d.xp}XP</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instruções do Desafio Ativo */}
      <Card className="border-quest-border bg-slate-900/90 shadow-xl">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple">Programação em Blocos (ScratchQuest)</Badge>
              <Badge variant="cyan">{desafio.titulo}</Badge>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +{desafio.xp} XP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{desafio.descricao}</p>
            <div className="text-xs text-indigo-300 font-medium mt-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Objetivo: {desafio.objetivo}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={carregarExemplo}
              disabled={emExecucao}
              className="text-xs"
            >
              Carregar Dica de Blocos
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScriptBlocos([])}
              disabled={emExecucao || scriptBlocos.length === 0}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Limpar Blocos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid Principal: Paleta de Blocos (Esquerda), Área de Montagem (Centro), Palco 2D (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. PALETA DE BLOCOS ESTILO SCRATCH (Col 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-quest-border shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              Paleta de Blocos
            </h3>

            <div className="space-y-4 text-xs">
              {/* Categoria Movimento */}
              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5" />
                  Movimento (Azul)
                </div>
                <div className="space-y-1.5">
                  {PALETA_BLOCOS.filter((b) => b.category === 'movimento').map((b) => (
                    <button
                      key={b.type}
                      type="button"
                      onClick={() => adicionarBloco(b.type)}
                      disabled={emExecucao}
                      className="w-full text-left p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow transition active:scale-95 disabled:opacity-50"
                    >
                      + {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categoria Ações */}
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Ações RPG (Âmbar)
                </div>
                <div className="space-y-1.5">
                  {PALETA_BLOCOS.filter((b) => b.category === 'acao').map((b) => (
                    <button
                      key={b.type}
                      type="button"
                      onClick={() => adicionarBloco(b.type)}
                      disabled={emExecucao}
                      className="w-full text-left p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow transition active:scale-95 disabled:opacity-50"
                    >
                      + {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categoria Controle */}
              <div>
                <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  Controle & Loops (Laranja)
                </div>
                <div className="space-y-1.5">
                  {PALETA_BLOCOS.filter((b) => b.category === 'controle').map((b) => (
                    <button
                      key={b.type}
                      type="button"
                      onClick={() => adicionarBloco(b.type)}
                      disabled={emExecucao}
                      className="w-full text-left p-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow transition active:scale-95 disabled:opacity-50"
                    >
                      + {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ÁREA DE MONTAGEM DO PROGRAMA / SCRIPTS (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-quest-border shadow-lg flex flex-col h-full min-h-[460px]">
            <div className="flex items-center justify-between mb-3 border-b border-quest-border pb-2.5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Área de Scripts
                </h3>
                <span className="text-[11px] text-slate-500">
                  {scriptBlocos.length} bloco(s) conectados
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>Ordem Topo ➔ Base</span>
              </div>
            </div>

            {/* Lista Vertical de Blocos Encaixados */}
            <div className="flex-1 space-y-2 overflow-y-auto max-h-[420px] pr-1">
              {scriptBlocos.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
                  <Layers className="w-10 h-10 mb-2 opacity-40 text-indigo-400" />
                  <p className="text-xs font-medium text-slate-400">Seu algoritmo está vazio</p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
                    Clique nos blocos coloridos da paleta à esquerda para montar a sequência lógica do herói!
                  </p>
                </div>
              ) : (
                scriptBlocos.map((bloco, idx) => {
                  const isRunning = blocoExecutandoId === bloco.id;
                  return (
                    <div
                      key={bloco.id}
                      className={getEstiloBloco(bloco.category, isRunning)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] opacity-75 bg-black/20 w-4 h-4 rounded-full flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <span className="text-xs">{bloco.label}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moverBloco(idx, 'cima')}
                          disabled={idx === 0 || emExecucao}
                          className="p-1 rounded hover:bg-black/20 disabled:opacity-30"
                          title="Mover para cima"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moverBloco(idx, 'baixo')}
                          disabled={idx === scriptBlocos.length - 1 || emExecucao}
                          className="p-1 rounded hover:bg-black/20 disabled:opacity-30"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removerBloco(bloco.id)}
                          disabled={emExecucao}
                          className="p-1 rounded hover:bg-red-950/80 text-red-200 hover:text-white ml-0.5"
                          title="Excluir bloco"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* 3. PALCO DE SIMULAÇÃO (STAGE) DO SCRATCHQUEST (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-quest-border shadow-lg space-y-3">
            {/* Controles do Palco estilo Scratch */}
            <div className="flex items-center justify-between border-b border-quest-border pb-3">
              <div className="flex items-center gap-2">
                {/* Botão Bandeira Verde (Play) */}
                <button
                  type="button"
                  onClick={executarAlgoritmo}
                  disabled={emExecucao || scriptBlocos.length === 0}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition active:scale-95"
                  title="Executar os blocos conectados"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Executar</span>
                </button>

                {/* Botão Parar / Resetar */}
                <button
                  type="button"
                  onClick={reiniciarPalco}
                  disabled={emExecucao}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition"
                  title="Resetar herói e itens"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resetar</span>
                </button>
              </div>

              {/* Seletor de Velocidade */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setVelocidade('normal')}
                  className={`px-2 py-0.5 rounded ${velocidade === 'normal' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'}`}
                >
                  1x
                </button>
                <button
                  type="button"
                  onClick={() => setVelocidade('rapida')}
                  className={`px-2 py-0.5 rounded ${velocidade === 'rapida' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'}`}
                >
                  2x
                </button>
              </div>
            </div>

            {/* TABULEIRO / GRID 2D */}
            <div className="flex items-center justify-center p-2 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
              <div
                className="grid gap-1.5 p-2"
                style={{
                  gridTemplateColumns: `repeat(${desafio.tamanho}, minmax(0, 1fr))`,
                  width: '100%',
                  maxWidth: '380px',
                  aspectRatio: '1 / 1',
                }}
              >
                {Array.from({ length: desafio.tamanho * desafio.tamanho }).map((_, index) => {
                  const gx = index % desafio.tamanho;
                  const gy = Math.floor(index / desafio.tamanho);

                  const isHero = posHeroi.x === gx && posHeroi.y === gy;
                  const isWall = desafio.paredes.some((p) => p.x === gx && p.y === gy);
                  const isTorch = desafio.tochas.some((t) => t.x === gx && t.y === gy);
                  const isTorchLit = tochasAcesas.includes(`${gx},${gy}`);
                  const isCrystal = desafio.cristais.some((c) => c.x === gx && c.y === gy);
                  const isCrystalCollected = cristaisColetados.includes(`${gx},${gy}`);
                  const isGoal = desafio.portal.x === gx && desafio.portal.y === gy;

                  return (
                    <div
                      key={`${gx}_${gy}`}
                      className={`relative rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 select-none ${
                        isWall
                          ? 'bg-slate-800 border-2 border-slate-700 shadow-inner'
                          : 'bg-slate-900/90 border border-slate-800/80 hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Parede */}
                      {isWall && <span className="text-slate-500 text-base">🧱</span>}

                      {/* Tocha */}
                      {isTorch && !isHero && (
                        <span className={`text-base transition-all ${isTorchLit ? 'scale-125 filter drop-shadow-[0_0_8px_#f59e0b]' : 'opacity-40'}`}>
                          {isTorchLit ? '🔥' : '🕯️'}
                        </span>
                      )}

                      {/* Cristal */}
                      {isCrystal && !isCrystalCollected && !isHero && (
                        <span className="text-base animate-pulse filter drop-shadow-[0_0_8px_#06b6d4]">
                          💎
                        </span>
                      )}

                      {/* Portal Final */}
                      {isGoal && !isHero && (
                        <span className="text-lg animate-spin filter drop-shadow-[0_0_10px_#a855f7]">
                          🌀
                        </span>
                      )}

                      {/* O Herói Aventureiro */}
                      {isHero && (
                        <div className="relative flex flex-col items-center justify-center animate-in zoom-in-75 duration-200">
                          <span className="text-xl filter drop-shadow-[0_0_10px_#6366f1]">
                            🧙‍♂️
                          </span>
                          <span className="text-[10px] font-extrabold text-amber-400 bg-slate-950/90 px-1 rounded-full leading-none -mt-1 shadow">
                            {getSetaHeroi(posHeroi.dir)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mensagem de Feedback e Status */}
            {mensagemStatus && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2 animate-in fade-in ${
                  statusTipo === 'sucesso'
                    ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                    : statusTipo === 'erro'
                    ? 'bg-red-950/60 border-red-700 text-red-200'
                    : 'bg-indigo-950/40 border-indigo-900 text-indigo-300'
                }`}
              >
                {statusTipo === 'sucesso' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : statusTipo === 'erro' ? (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                )}
                <span className="leading-snug">{mensagemStatus}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE VITÓRIA E PROGRESSO */}
      {modalVitoria && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-md w-full border-emerald-500/60 bg-slate-900 text-center shadow-2xl">
            <CardHeader className="pt-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-400 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/30">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <CardTitle className="text-2xl text-white">Algoritmo Aprovado!</CardTitle>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Parabéns! Você resolveu com êxito o <strong>{desafio.titulo}</strong> montando blocos visuais!
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around">
                <div>
                  <div className="text-xs text-slate-400">XP Concedido</div>
                  <div className="text-xl font-bold text-amber-400">+{desafio.xp} XP</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400">Blocos Utilizados</div>
                  <div className="text-sm font-semibold text-blue-400">{scriptBlocos.length} blocos</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {desafio.id < 4 ? (
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2"
                    onClick={() => {
                      setModalVitoria(false);
                      setDesafioId(desafio.id + 1);
                    }}
                  >
                    <span>Avançar para a Fase {desafio.id + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                    onClick={() => setModalVitoria(false)}
                  >
                    Você Dominou a Programação em Blocos!
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setModalVitoria(false)}
                >
                  Continuar Praticando nesta Fase
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

