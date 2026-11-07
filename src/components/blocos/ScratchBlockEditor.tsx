'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Volume2,
  VolumeX,
  FastForward,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Tipos de blocos estilo Scratch
export type BlockType =
  | 'avancar'
  | 'avancar_2'
  | 'recuar'
  | 'girar_direita'
  | 'girar_esquerda'
  | 'girar_180'
  | 'acender_tocha'
  | 'coletar_cristal'
  | 'repetir_2_avancar'
  | 'repetir_3_avancar'
  | 'repetir_5_avancar'
  | 'repetir_coleta';

export interface ScratchBlock {
  id: string;
  type: BlockType;
  label: string;
  category: 'movimento' | 'acao' | 'controle';
}

// Paleta completa de blocos estilo Scratch
const PALETA_BLOCOS: { type: BlockType; label: string; category: 'movimento' | 'acao' | 'controle' }[] = [
  // Movimento (Azul)
  { type: 'avancar', label: 'Avançar 1 passo', category: 'movimento' },
  { type: 'avancar_2', label: 'Avançar 2 passos', category: 'movimento' },
  { type: 'recuar', label: 'Recuar 1 passo 🔙', category: 'movimento' },
  { type: 'girar_direita', label: 'Girar 90° à Direita ↷', category: 'movimento' },
  { type: 'girar_esquerda', label: 'Girar 90° à Esquerda ↶', category: 'movimento' },
  { type: 'girar_180', label: 'Meia-Volta (180°) 🔄', category: 'movimento' },

  // Ações RPG (Âmbar/Amarelo)
  { type: 'acender_tocha', label: 'Acender Tocha 🔥', category: 'acao' },
  { type: 'coletar_cristal', label: 'Coletar Cristal 💎', category: 'acao' },

  // Controle & Repetição (Laranja vivo)
  { type: 'repetir_2_avancar', label: '🔁 Repetir 2x [ Avançar ]', category: 'controle' },
  { type: 'repetir_3_avancar', label: '🔁 Repetir 3x [ Avançar ]', category: 'controle' },
  { type: 'repetir_5_avancar', label: '🔁 Repetir 5x [ Avançar ]', category: 'controle' },
  { type: 'repetir_coleta', label: '🔁 Repetir 3x [ Avançar + Coletar ]', category: 'controle' },
];

// Efeitos Sonoros com Web Audio API nativo (Zero dependências externas)
function emitirSom(tipo: 'passo' | 'giro' | 'tocha' | 'cristal' | 'vitoria' | 'colisao', habilitado: boolean) {
  if (!habilitado || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (tipo === 'passo') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (tipo === 'giro') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(390, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (tipo === 'cristal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.07); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (tipo === 'tocha') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (tipo === 'colisao') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (tipo === 'vitoria') {
      const notas = [523.25, 659.25, 783.99, 1046.50];
      notas.forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        const t = now + idx * 0.12;
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.28);
        o.start(t);
        o.stop(t + 0.28);
      });
    }
  } catch (e) {
    // Navegador pode bloquear áudio antes do primeiro clique
  }
}

// 8 Desafios Progressivos com Variedade Rica de Cenários
interface DesafioConfig {
  id: number;
  titulo: string;
  descricao: string;
  objetivo: string;
  tamanho: number;
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
    descricao: 'Acenda as 2 tochas sagradas e alcance o portal místico usando sequenciamento linear.',
    objetivo: 'Acender todas as tochas e entrar no portal.',
    tamanho: 5,
    heroiInicio: { x: 0, y: 0, dir: 1 },
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
    descricao: 'Contorne as muralhas do castelo usando giros de 90° e acione o portal final.',
    objetivo: 'Desviar da parede com giros precisos e alcançar o portal.',
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
    titulo: 'Desafio 4: A Dança do Zigue-Zague',
    descricao: 'Percorra um caminho em zigue-zague coletando cristais e acendendo tochas em cada vértice.',
    objetivo: 'Alternar curvas à direita e à esquerda sem colidir nas barreiras.',
    tamanho: 6,
    heroiInicio: { x: 0, y: 0, dir: 1 },
    paredes: [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 },
    ],
    tochas: [{ x: 1, y: 2 }, { x: 5, y: 4 }],
    cristais: [{ x: 3, y: 1 }, { x: 3, y: 3 }],
    portal: { x: 5, y: 5 },
    blocosSugeridos: ['avancar', 'girar_direita', 'avancar_2', 'acender_tocha', 'girar_esquerda'],
    xp: 35,
  },
  {
    id: 5,
    titulo: 'Desafio 5: O Fosso do Dragão',
    descricao: 'Um desfiladeiro estreito cercado de precipícios. Use avanços precisos para recolher as relíquias.',
    objetivo: 'Percorrer a ponte estreita, coletar 3 cristais e alcançar o portal seguro.',
    tamanho: 6,
    heroiInicio: { x: 0, y: 3, dir: 1 },
    paredes: [
      { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
      { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
      { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 5, y: 0 }, { x: 5, y: 1 },
    ],
    tochas: [{ x: 5, y: 2 }],
    cristais: [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 }],
    portal: { x: 5, y: 3 },
    blocosSugeridos: ['repetir_coleta', 'avancar', 'acender_tocha'],
    xp: 40,
  },
  {
    id: 6,
    titulo: 'Desafio 6: A Forja do Autômato',
    descricao: 'Colete os cristais de energia, acenda a tocha sagrada da forja e desperte o portal!',
    objetivo: 'Coletar os cristais, acender a forja central e chegar ao portal.',
    tamanho: 6,
    heroiInicio: { x: 0, y: 0, dir: 1 },
    paredes: [
      { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
    ],
    tochas: [{ x: 2, y: 2 }],
    cristais: [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 2, y: 4 }],
    portal: { x: 5, y: 5 },
    blocosSugeridos: ['avancar_2', 'girar_direita', 'coletar_cristal', 'avancar', 'acender_tocha'],
    xp: 45,
  },
  {
    id: 7,
    titulo: 'Desafio 7: O Labirinto em Espiral',
    descricao: 'Um percurso em caracol que vai da borda externa até o núcleo místico das catacumbas.',
    objetivo: 'Seguir o padrão de repetições e curvas concêntricas até o centro.',
    tamanho: 6,
    heroiInicio: { x: 0, y: 0, dir: 1 },
    paredes: [
      { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
      { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
      { x: 3, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 4 },
      { x: 1, y: 3 }, { x: 2, y: 3 },
    ],
    tochas: [{ x: 5, y: 0 }, { x: 5, y: 5 }],
    cristais: [{ x: 0, y: 5 }, { x: 3, y: 2 }],
    portal: { x: 2, y: 2 },
    blocosSugeridos: ['repetir_5_avancar', 'acender_tocha', 'girar_direita', 'repetir_5_avancar'],
    xp: 50,
  },
  {
    id: 8,
    titulo: 'Desafio 8: A Torre do Mestre dos Magos (Chefe Final)',
    descricao: 'O grande teste supremo da Torre dos Magos: 3 tochas ancestrais e 4 cristais arcanos em um tabuleiro 7x7!',
    objetivo: 'Acender as 3 tochas, coletar os 4 cristais e entrar no portal místico.',
    tamanho: 7,
    heroiInicio: { x: 0, y: 0, dir: 1 },
    paredes: [
      { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
      { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
      { x: 1, y: 4 }, { x: 2, y: 4 },
      { x: 5, y: 0 }, { x: 5, y: 1 },
      { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 },
    ],
    tochas: [{ x: 1, y: 2 }, { x: 5, y: 3 }, { x: 3, y: 6 }],
    cristais: [{ x: 0, y: 3 }, { x: 6, y: 0 }, { x: 6, y: 5 }, { x: 3, y: 3 }],
    portal: { x: 6, y: 6 },
    blocosSugeridos: ['avancar_2', 'girar_direita', 'acender_tocha', 'repetir_3_avancar', 'coletar_cristal'],
    xp: 60,
  },
];

interface ScratchBlockEditorProps {
  desafioInicialId?: number;
  onConcluirDesafio?: (desafioId: number, xp: number) => void;
}

export function ScratchBlockEditor({ desafioInicialId = 1, onConcluirDesafio }: ScratchBlockEditorProps) {
  const [desafioId, setDesafioId] = useState(desafioInicialId);
  const desafio = DESAFIOS.find((d) => d.id === desafioId) || DESAFIOS[0];

  const [scriptBlocos, setScriptBlocos] = useState<ScratchBlock[]>([]);
  const [posHeroi, setPosHeroi] = useState({ x: 0, y: 0, dir: 1 });
  const [tochasAcesas, setTochasAcesas] = useState<string[]>([]);
  const [cristaisColetados, setCristaisColetados] = useState<string[]>([]);
  const [emExecucao, setEmExecucao] = useState(false);
  const [blocoExecutandoId, setBlocoExecutandoId] = useState<string | null>(null);
  const [mensagemStatus, setMensagemStatus] = useState<string | null>(null);
  const [statusTipo, setStatusTipo] = useState<'info' | 'sucesso' | 'erro'>('info');
  const [modalVitoria, setModalVitoria] = useState(false);
  const [velocidade, setVelocidade] = useState<'normal' | 'rapida'>('normal');
  const [somAtivo, setSomAtivo] = useState(true);

  const reiniciarPalco = useCallback(() => {
    setPosHeroi({ ...desafio.heroiInicio });
    setTochasAcesas([]);
    setCristaisColetados([]);
    setEmExecucao(false);
    setBlocoExecutandoId(null);
    setMensagemStatus('Monte seu algoritmo com os blocos e clique em Executar para testar!');
    setStatusTipo('info');
  }, [desafio]);

  useEffect(() => {
    reiniciarPalco();
    setScriptBlocos([]);
  }, [reiniciarPalco]);

  const adicionarBloco = (tipo: BlockType) => {
    if (emExecucao) return;
    const modelo = PALETA_BLOCOS.find((b) => b.type === tipo);
    if (!modelo) return;

    emitirSom('giro', somAtivo);

    const novoBloco: ScratchBlock = {
      id: `${tipo}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type: tipo,
      label: modelo.label,
      category: modelo.category,
    };

    setScriptBlocos((prev) => [...prev, novoBloco]);
  };

  const removerBloco = (id: string) => {
    if (emExecucao) return;
    setScriptBlocos((prev) => prev.filter((b) => b.id !== id));
  };

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
    emitirSom('tocha', somAtivo);
  };

  const executarAlgoritmo = async () => {
    if (emExecucao || scriptBlocos.length === 0) return;

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

    const delayTempo = velocidade === 'rapida' ? 220 : 450;
    const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const deltas = [
      { dx: 0, dy: -1 }, // Cima
      { dx: 1, dy: 0 },  // Direita
      { dx: 0, dy: 1 },  // Baixo
      { dx: -1, dy: 0 }, // Esquerda
    ];

    let bateuParede = false;

    const darUmPasso = (invertido: boolean = false) => {
      const multiplicador = invertido ? -1 : 1;
      const nx = x + deltas[dir].dx * multiplicador;
      const ny = y + deltas[dir].dy * multiplicador;

      if (nx < 0 || nx >= desafio.tamanho || ny < 0 || ny >= desafio.tamanho) {
        bateuParede = true;
        emitirSom('colisao', somAtivo);
        return;
      }

      const temParede = desafio.paredes.some((p) => p.x === nx && p.y === ny);
      if (temParede) {
        bateuParede = true;
        emitirSom('colisao', somAtivo);
        return;
      }

      x = nx;
      y = ny;
      setPosHeroi({ x, y, dir });
      emitirSom('passo', somAtivo);
    };

    for (let i = 0; i < scriptBlocos.length; i++) {
      const bloco = scriptBlocos[i];
      setBlocoExecutandoId(bloco.id);

      switch (bloco.type) {
        case 'avancar':
          darUmPasso(false);
          break;

        case 'avancar_2':
          darUmPasso(false);
          if (!bateuParede) {
            await esperar(delayTempo / 2);
            darUmPasso(false);
          }
          break;

        case 'recuar':
          darUmPasso(true);
          break;

        case 'girar_direita':
          dir = (dir + 1) % 4;
          setPosHeroi({ x, y, dir });
          emitirSom('giro', somAtivo);
          break;

        case 'girar_esquerda':
          dir = (dir + 3) % 4;
          setPosHeroi({ x, y, dir });
          emitirSom('giro', somAtivo);
          break;

        case 'girar_180':
          dir = (dir + 2) % 4;
          setPosHeroi({ x, y, dir });
          emitirSom('giro', somAtivo);
          break;

        case 'acender_tocha': {
          const chave = `${x},${y}`;
          const ehPosicaoTocha = desafio.tochas.some((t) => t.x === x && t.y === y);
          if (ehPosicaoTocha && !tochas.includes(chave)) {
            tochas.push(chave);
            setTochasAcesas([...tochas]);
            emitirSom('tocha', somAtivo);
          }
          break;
        }

        case 'coletar_cristal': {
          const chave = `${x},${y}`;
          const ehPosicaoCristal = desafio.cristais.some((c) => c.x === x && c.y === y);
          if (ehPosicaoCristal && !cristais.includes(chave)) {
            cristais.push(chave);
            setCristaisColetados([...cristais]);
            emitirSom('cristal', somAtivo);
          }
          break;
        }

        case 'repetir_2_avancar':
          for (let k = 0; k < 2 && !bateuParede; k++) {
            darUmPasso(false);
            await esperar(delayTempo / 2);
          }
          break;

        case 'repetir_3_avancar':
          for (let k = 0; k < 3 && !bateuParede; k++) {
            darUmPasso(false);
            await esperar(delayTempo / 2);
          }
          break;

        case 'repetir_5_avancar':
          for (let k = 0; k < 5 && !bateuParede; k++) {
            darUmPasso(false);
            await esperar(delayTempo / 2);
          }
          break;

        case 'repetir_coleta':
          for (let k = 0; k < 3 && !bateuParede; k++) {
            darUmPasso(false);
            const chave = `${x},${y}`;
            if (desafio.cristais.some((c) => c.x === x && c.y === y) && !cristais.includes(chave)) {
              cristais.push(chave);
              setCristaisColetados([...cristais]);
              emitirSom('cristal', somAtivo);
            }
            await esperar(delayTempo / 2);
          }
          break;
      }

      await esperar(delayTempo);

      if (bateuParede) {
        setBlocoExecutandoId(null);
        setEmExecucao(false);
        setMensagemStatus('💥 Ops! O herói bateu na parede ou saiu do mapa! Ajuste os giros do algoritmo.');
        setStatusTipo('erro');
        return;
      }
    }

    setBlocoExecutandoId(null);
    setEmExecucao(false);

    const chegouPortal = x === desafio.portal.x && y === desafio.portal.y;
    const acendeuTodasTochas = desafio.tochas.length === 0 || tochas.length === desafio.tochas.length;
    const coletouTodosCristais = desafio.cristais.length === 0 || cristais.length === desafio.cristais.length;

    if (chegouPortal && acendeuTodasTochas && coletouTodosCristais) {
      setMensagemStatus('🎉 Vitória Espetacular! Seu algoritmo em blocos concluiu todos os objetivos!');
      setStatusTipo('sucesso');
      setModalVitoria(true);
      emitirSom('vitoria', somAtivo);

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
      setMensagemStatus('Quase lá! O herói executou todos os blocos, mas não alcançou o Portal mágico.');
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
      case 0: return '▲';
      case 1: return '▶';
      case 2: return '▼';
      case 3: return '◀';
      default: return '▶';
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
      {/* Seletor dos 8 Desafios */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-quest-border shadow-lg">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-white">8 Desafios em Blocos:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {DESAFIOS.map((d) => (
            <button
              key={d.id}
              onClick={() => !emExecucao && setDesafioId(d.id)}
              disabled={emExecucao}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                d.id === desafioId
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Fase {d.id}</span>
              <span className="text-[10px] text-amber-300 font-mono">+{d.xp}XP</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instruções do Desafio Ativo */}
      <Card className="border-quest-border bg-slate-900/90 shadow-xl">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
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
              Dica de Blocos
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScriptBlocos([])}
              disabled={emExecucao || scriptBlocos.length === 0}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Limpar
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

            <div className="flex-1 space-y-2 overflow-y-auto max-h-[420px] pr-1">
              {scriptBlocos.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
                  <Layers className="w-10 h-10 mb-2 opacity-40 text-indigo-400" />
                  <p className="text-xs font-medium text-slate-400">Seu algoritmo está vazio</p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
                    Clique nos blocos coloridos da paleta à esquerda para montar a sequência do herói!
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
            <div className="flex items-center justify-between border-b border-quest-border pb-3">
              <div className="flex items-center gap-2">
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

              <div className="flex items-center gap-2">
                {/* Botão de Som */}
                <button
                  type="button"
                  onClick={() => setSomAtivo(!somAtivo)}
                  className={`p-1.5 rounded-lg border text-xs transition ${
                    somAtivo
                      ? 'bg-indigo-950/80 border-indigo-700 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                  title={somAtivo ? 'Efeitos Sonoros Ativos' : 'Som Mudo'}
                >
                  {somAtivo ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

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
            </div>

            {/* TABULEIRO / GRID 2D ANIMADO */}
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
                Parabéns! Você resolveu com maestria o <strong>{desafio.titulo}</strong> montando blocos visuais!
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
                {desafio.id < 8 ? (
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2"
                    onClick={() => {
                      setModalVitoria(false);
                      setDesafioId(desafio.id + 1);
                    }}
                  >
                    <span>Avançar para o Desafio {desafio.id + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                    onClick={() => setModalVitoria(false)}
                  >
                    🏆 Você Venceu Todos os 8 Desafios em Blocos!
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
