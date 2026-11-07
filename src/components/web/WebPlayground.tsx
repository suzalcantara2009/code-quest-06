'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Code2,
  FileCode,
  Layout,
  Eye,
  CheckSquare,
  BookOpen,
  ArrowRight,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface DesafioHtmlCss {
  id: number;
  titulo: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  xp: number;
  descricao: string;
  objetivo: string;
  dica: string;
  htmlInicial: string;
  cssInicial: string;
  criterios: {
    id: string;
    descricao: string;
    validar: (html: string, css: string) => boolean;
  }[];
}

export const DESAFIOS_HTML_CSS: DesafioHtmlCss[] = [
  {
    id: 1,
    titulo: 'Fase 1: O Pergaminho Semântico',
    dificuldade: 'facil',
    xp: 15,
    descricao:
      'Crie a marcação HTML5 semântica para um pergaminho de missão usando as tags <article>, <header>, <h2> e <p>.',
    objetivo:
      'Utilize tags semânticas estruturadas para que o pergaminho tenha cabeçalho com título e parágrafo de descrição.',
    dica: 'A tag <article> envolve toda a missão, <header> contém o <h2> e a tag <p> descreve o objetivo.',
    htmlInicial: `<!-- Desafio 1: O Pergaminho Semântico -->
<article class="pergaminho">
  <header>
    <h2>O Covil do Dragão de Jade</h2>
  </header>
  <p>Encontre a relíquia guardada no fundo da caverna ancestral.</p>
</article>`,
    cssInicial: `/* Estilos do Pergaminho */
.pergaminho {
  background-color: #0f172a;
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 20px;
  color: #f8fafc;
  font-family: sans-serif;
}

h2 {
  color: #34d399;
  margin-top: 0;
}

p {
  color: #94a3b8;
  line-height: 1.5;
}`,
    criterios: [
      {
        id: 'tem_article',
        descricao: 'Contém a tag semântica <article>',
        validar: (html) => /<article[\s>]/i.test(html) && /<\/article>/i.test(html),
      },
      {
        id: 'tem_header',
        descricao: 'Contém a tag semântica <header>',
        validar: (html) => /<header[\s>]/i.test(html) && /<\/header>/i.test(html),
      },
      {
        id: 'tem_titulo',
        descricao: 'Contém um título <h2> ou <h1>',
        validar: (html) => /<h[12][\s>]/i.test(html) && /<\/h[12]>/i.test(html),
      },
      {
        id: 'tem_paragrafo',
        descricao: 'Contém ao menos um parágrafo <p>',
        validar: (html) => /<p[\s>]/i.test(html) && /<\/p>/i.test(html),
      },
    ],
  },
  {
    id: 2,
    titulo: 'Fase 2: O Escudo de Aço (Cores e Bordas)',
    dificuldade: 'facil',
    xp: 20,
    descricao:
      'Estilize o escudo de defesa com uma cor de fundo escura, borda sólida com brilho e cantos arredondados usando border-radius.',
    objetivo:
      'Configure a classe .escudo com background-color, border de pelo menos 2px e border-radius de no mínimo 12px.',
    dica: 'Use border: 2px solid #06b6d4 e border-radius: 16px para criar uma blindagem futurista.',
    htmlInicial: `<div class="escudo">
  <h3>🛡️ Escudo de Mithril</h3>
  <p>Defesa Física: +45</p>
</div>`,
    cssInicial: `.escudo {
  /* Complete as propriedades abaixo: */
  background-color: #1e1b4b;
  border: 2px solid #818cf8;
  border-radius: 16px;
  padding: 24px;
  color: #e0e7ff;
  text-align: center;
  font-family: sans-serif;
}`,
    criterios: [
      {
        id: 'tem_background',
        descricao: 'Define background-color para o elemento',
        validar: (_, css) => /background(-color)?\s*:\s*[^;]+/i.test(css),
      },
      {
        id: 'tem_border',
        descricao: 'Define borda sólida de pelo menos 2px',
        validar: (_, css) => /border\s*:\s*[2-9]px|border-width\s*:\s*[2-9]px/i.test(css),
      },
      {
        id: 'tem_border_radius',
        descricao: 'Aplica cantos arredondados com border-radius >= 8px',
        validar: (_, css) => /border-radius\s*:\s*([8-9]|[1-9][0-9])px/i.test(css),
      },
    ],
  },
  {
    id: 3,
    titulo: 'Fase 3: A Poção Alquímica (Box Model)',
    dificuldade: 'medio',
    xp: 25,
    descricao:
      'Ajuste o Box Model do frasco de poção aplicando espaçamento interno (padding >= 16px) e margem externa (margin >= 10px).',
    objetivo:
      'Demonstre domínio do Box Model configurando padding e margin adequados no card .frasco-pocao.',
    dica: 'Padding afasta o conteúdo das bordas internas, enquanto margin cria respiro em relação aos outros elementos.',
    htmlInicial: `<div class="arena">
  <div class="frasco-pocao">
    <span class="icone">🧪</span>
    <h4>Poção de Mana Maior</h4>
    <p>Restaura 120 pontos de energia arcana.</p>
  </div>
</div>`,
    cssInicial: `.arena {
  background-color: #020617;
  padding: 20px;
}

.frasco-pocao {
  background-color: #0f172a;
  border: 2px solid #38bdf8;
  border-radius: 12px;
  color: #f8fafc;
  font-family: sans-serif;
  text-align: center;
  
  /* Ajuste o Box Model: */
  padding: 20px;
  margin: 16px auto;
  max-width: 260px;
}

.icone {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}`,
    criterios: [
      {
        id: 'tem_padding',
        descricao: 'Aplica padding de pelo menos 15px',
        validar: (_, css) => /padding\s*:\s*([1-9][5-9]|[2-9][0-9])px/i.test(css),
      },
      {
        id: 'tem_margin',
        descricao: 'Aplica margem externa (margin >= 10px)',
        validar: (_, css) => /margin\s*:\s*[^;]+/i.test(css),
      },
    ],
  },
  {
    id: 4,
    titulo: 'Fase 4: O Cinto de Utilidades (Flexbox)',
    dificuldade: 'medio',
    xp: 25,
    descricao:
      'Organize 3 itens mágicos lado a lado em linha usando Flexbox com display: flex, justify-content e espaçamento gap.',
    objetivo:
      'Configure .cinto com display: flex, align-items: center, justify-content e gap entre os itens.',
    dica: 'Use display: flex; justify-content: space-around; gap: 12px; para distribuir os slots harmonicamente.',
    htmlInicial: `<div class="cinto">
  <div class="slot">🗡️ Espada</div>
  <div class="slot">🛡️ Escudo</div>
  <div class="slot">🏹 Arco</div>
</div>`,
    cssInicial: `.cinto {
  /* Configure o Flexbox: */
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 12px;

  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px;
}

.slot {
  background-color: #1e293b;
  border: 1px solid #64748b;
  border-radius: 8px;
  padding: 12px 18px;
  color: #f8fafc;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 14px;
}`,
    criterios: [
      {
        id: 'tem_display_flex',
        descricao: 'Aplica display: flex no container',
        validar: (_, css) => /display\s*:\s*flex/i.test(css),
      },
      {
        id: 'tem_justify',
        descricao: 'Define justify-content para alinhamento horizontal',
        validar: (_, css) => /justify-content\s*:\s*(space-between|space-around|space-evenly|center)/i.test(css),
      },
      {
        id: 'tem_gap',
        descricao: 'Define espaçamento gap entre os itens flex',
        validar: (_, css) => /gap\s*:\s*[0-9]+px/i.test(css),
      },
    ],
  },
  {
    id: 5,
    titulo: 'Fase 5: A Mochila do Guardião (CSS Grid)',
    dificuldade: 'medio',
    xp: 30,
    descricao:
      'Construa uma grade de inventário 3x2 de itens mágicos usando CSS Grid com display: grid e grid-template-columns.',
    objetivo:
      'Utilize grid-template-columns: repeat(3, 1fr) ou repeat(3, minmax(...)) e defina gap entre as células.',
    dica: 'A função repeat(3, 1fr) cria exatamente 3 colunas de largura proporcional idêntica.',
    htmlInicial: `<div class="grade-inventario">
  <div class="item">💎 Runa</div>
  <div class="item">📜 Pergaminho</div>
  <div class="item">🧪 Poção</div>
  <div class="item">🗝️ Chave</div>
  <div class="item">🪙 Ouro</div>
  <div class="item">🧭 Bússola</div>
</div>`,
    cssInicial: `.grade-inventario {
  /* Configure o CSS Grid: */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  background-color: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 16px;
}

.item {
  background-color: #1e293b;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 18px;
  color: #f1f5f9;
  text-align: center;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: bold;
}`,
    criterios: [
      {
        id: 'tem_display_grid',
        descricao: 'Aplica display: grid no container de inventário',
        validar: (_, css) => /display\s*:\s*grid/i.test(css),
      },
      {
        id: 'tem_grid_columns',
        descricao: 'Define 3 colunas com grid-template-columns',
        validar: (_, css) => /grid-template-columns\s*:\s*.*(repeat\(3|1fr\s+1fr\s+1fr)/i.test(css),
      },
      {
        id: 'tem_grid_gap',
        descricao: 'Define espaçamento gap na grade',
        validar: (_, css) => /gap\s*:\s*[0-9]+px/i.test(css),
      },
    ],
  },
  {
    id: 6,
    titulo: 'Fase 6: O Botão Flamejante (Hover & Transform)',
    dificuldade: 'medio',
    xp: 30,
    descricao:
      'Crie um botão de invocação mágica com efeito de hover interativo, aplicando transição suave, elevação (transform) e brilho néon (box-shadow).',
    objetivo:
      'Implemente o seletor .btn-invocar:hover com transform e box-shadow brilhante, além de transition no estado normal.',
    dica: 'A propriedade transition: all 0.3s ease garante que o botão não mude de forma brusca ao passar o mouse.',
    htmlInicial: `<div class="container-acao">
  <button type="button" class="btn-invocar">
    🔥 Invocar Fênix Astral
  </button>
</div>`,
    cssInicial: `.container-acao {
  padding: 30px;
  text-align: center;
  background-color: #020617;
}

.btn-invocar {
  background-color: #ea580c;
  color: #ffffff;
  border: 2px solid #f97316;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Complete o estado hover: */
.btn-invocar:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.7);
  background-color: #f97316;
}`,
    criterios: [
      {
        id: 'tem_transition',
        descricao: 'Aplica transição suave (transition) no botão',
        validar: (_, css) => /transition\s*:\s*[^;]+/i.test(css),
      },
      {
        id: 'tem_hover',
        descricao: 'Implementa a pseudo-classe :hover',
        validar: (_, css) => /:hover\s*\{/i.test(css),
      },
      {
        id: 'tem_transform_shadow',
        descricao: 'Aplica transform ou box-shadow no estado hover',
        validar: (_, css) => /transform\s*:\s*|box-shadow\s*:\s*/i.test(css),
      },
    ],
  },
  {
    id: 7,
    titulo: 'Fase 7: A Barra de Mana Pulsante (@keyframes)',
    dificuldade: 'dificil',
    xp: 35,
    descricao:
      'Construa uma animação contínua @keyframes chamada "pulsarMana" que altere a luminosidade e crie um degradê com linear-gradient.',
    objetivo:
      'Defina a regra @keyframes pulsarMana e aplique animation: pulsarMana no preenchimento da barra de mana.',
    dica: 'Use linear-gradient(90deg, #06b6d4, #3b82f6) e anime a propriedade filter: brightness() ou box-shadow.',
    htmlInicial: `<div class="painel-mana">
  <div class="rotulo">Energia Arcana (Mana)</div>
  <div class="barra-fundo">
    <div class="barra-preenchimento"></div>
  </div>
</div>`,
    cssInicial: `@keyframes pulsarMana {
  0% {
    filter: brightness(1) drop-shadow(0 0 4px #06b6d4);
  }
  100% {
    filter: brightness(1.3) drop-shadow(0 0 14px #3b82f6);
  }
}

.painel-mana {
  background-color: #0f172a;
  padding: 24px;
  border-radius: 12px;
  font-family: sans-serif;
}

.rotulo {
  color: #38bdf8;
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 8px;
}

.barra-fundo {
  width: 100%;
  height: 22px;
  background-color: #1e293b;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid #0369a1;
}

.barra-preenchimento {
  width: 80%;
  height: 100%;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  animation: pulsarMana 1.5s infinite alternate ease-in-out;
}`,
    criterios: [
      {
        id: 'tem_keyframes',
        descricao: 'Declara uma animação com a regra @keyframes',
        validar: (_, css) => /@keyframes\s+pulsarMana/i.test(css),
      },
      {
        id: 'tem_linear_gradient',
        descricao: 'Aplica degradê de cores com linear-gradient',
        validar: (_, css) => /linear-gradient\s*\(/i.test(css),
      },
      {
        id: 'tem_animation',
        descricao: 'Vincula a animação com a propriedade animation',
        validar: (_, css) => /animation\s*:\s*.*pulsarMana/i.test(css),
      },
    ],
  },
  {
    id: 8,
    titulo: 'Fase 8: O Painel Responsivo (@media)',
    dificuldade: 'dificil',
    xp: 40,
    descricao:
      'Crie um card de aventureiro responsivo: em dispositivos móveis, ele se exibe em coluna única; em telas de 768px ou mais, ele expande para grade de duas colunas com @media (min-width: 768px).',
    objetivo:
      'Implemente uma Media Query @media (min-width: 768px) que altere a disposição do painel para duas colunas.',
    dica: 'Em mobile use display: flex com flex-direction: column; na media query, altere para grid com 2 colunas.',
    htmlInicial: `<div class="ficha-heroi">
  <div class="avatar-box">
    <div class="foto-heroi">🧙‍♂️</div>
    <h3>Mago Astral</h3>
  </div>
  <div class="atributos-box">
    <p>Vida: 100 / 100</p>
    <p>Poder Mágico: 85</p>
    <p>Defesa Arcana: 70</p>
  </div>
</div>`,
    cssInicial: `.ficha-heroi {
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px;
  color: #f8fafc;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.foto-heroi {
  font-size: 40px;
}

.atributos-box {
  background-color: #1e293b;
  padding: 12px;
  border-radius: 8px;
}

/* Adapte para telas a partir de 768px: */
@media (min-width: 768px) {
  .ficha-heroi {
    display: grid;
    grid-template-columns: 200px 1fr;
    padding: 24px;
  }
}`,
    criterios: [
      {
        id: 'tem_media_query',
        descricao: 'Declara @media (min-width: 768px)',
        validar: (_, css) => /@media\s*\(\s*min-width\s*:\s*768px\s*\)/i.test(css),
      },
      {
        id: 'tem_grid_ou_duas_colunas',
        descricao: 'Altera o layout para duas colunas dentro da media query',
        validar: (_, css) => /grid-template-columns|flex-direction\s*:\s*row/i.test(css),
      },
    ],
  },
];

interface WebPlaygroundProps {
  desafioInicialId?: number;
  onConcluirDesafio?: (id: number) => void;
}

export function WebPlayground({ desafioInicialId = 1, onConcluirDesafio }: WebPlaygroundProps) {
  const [desafioId, setDesafioId] = useState<number>(desafioInicialId);
  const desafio = DESAFIOS_HTML_CSS.find((d) => d.id === desafioId) || DESAFIOS_HTML_CSS[0];

  const [abaCodigo, setAbaCodigo] = useState<'html' | 'css'>('html');
  const [abaPainelDireito, setAbaPainelDireito] = useState<'preview' | 'testes' | 'dicas'>('preview');

  const [codigoHtml, setCodigoHtml] = useState(desafio.htmlInicial);
  const [codigoCss, setCodigoCss] = useState(desafio.cssInicial);

  const [testesResultado, setTestesResultado] = useState<{ id: string; descricao: string; aprovado: boolean }[]>([]);
  const [sucessoGeral, setSucessoGeral] = useState<boolean | null>(null);
  const [somAtivo, setSomAtivo] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const [larguraPreview, setLarguraPreview] = useState<'100%' | '375px'>('100%');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Audio sintetizado
  const tocarSom = (tipo: 'executar' | 'sucesso' | 'erro' | 'vitoria') => {
    if (!somAtivo || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const agora = ctx.currentTime;
      if (tipo === 'executar') {
        osc.frequency.setValueAtTime(440, agora);
        osc.frequency.exponentialRampToValueAtTime(880, agora + 0.1);
        gain.gain.setValueAtTime(0.1, agora);
        gain.gain.linearRampToValueAtTime(0.01, agora + 0.1);
        osc.start(agora);
        osc.stop(agora + 0.1);
      } else if (tipo === 'sucesso') {
        osc.frequency.setValueAtTime(523.25, agora);
        osc.frequency.setValueAtTime(659.25, agora + 0.08);
        osc.frequency.setValueAtTime(783.99, agora + 0.16);
        gain.gain.setValueAtTime(0.12, agora);
        gain.gain.linearRampToValueAtTime(0.01, agora + 0.25);
        osc.start(agora);
        osc.stop(agora + 0.25);
      } else if (tipo === 'erro') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, agora);
        osc.frequency.linearRampToValueAtTime(140, agora + 0.2);
        gain.gain.setValueAtTime(0.12, agora);
        gain.gain.linearRampToValueAtTime(0.01, agora + 0.2);
        osc.start(agora);
        osc.stop(agora + 0.2);
      } else if (tipo === 'vitoria') {
        const notas = [523.25, 659.25, 783.99, 1046.5];
        notas.forEach((freq, idx) => {
          const oscV = ctx.createOscillator();
          const gainV = ctx.createGain();
          oscV.connect(gainV);
          gainV.connect(ctx.destination);
          oscV.frequency.setValueAtTime(freq, agora + idx * 0.1);
          gainV.gain.setValueAtTime(0.15, agora + idx * 0.1);
          gainV.gain.linearRampToValueAtTime(0.01, agora + idx * 0.1 + 0.18);
          oscV.start(agora + idx * 0.1);
          oscV.stop(agora + idx * 0.1 + 0.18);
        });
      }
    } catch (e) {}
  };

  // Carregar desafio ao mudar ID
  useEffect(() => {
    setCodigoHtml(desafio.htmlInicial);
    setCodigoCss(desafio.cssInicial);
    setTestesResultado([]);
    setSucessoGeral(null);
  }, [desafioId, desafio.htmlInicial, desafio.cssInicial]);

  // Atualizar iframe de preview
  useEffect(() => {
    if (!iframeRef.current) return;
    const documentoHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              margin: 0;
              padding: 16px;
              background-color: #030712;
              color: #f9fafb;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            * { box-sizing: border-box; }
            ${codigoCss}
          </style>
        </head>
        <body>
          ${codigoHtml}
        </body>
      </html>
    `;
    iframeRef.current.srcdoc = documentoHtml;
  }, [codigoHtml, codigoCss]);

  const atualizarPreview = () => {
    if (!iframeRef.current) return;
    const documentoHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              margin: 0;
              padding: 16px;
              background-color: #030712;
              color: #f9fafb;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            * { box-sizing: border-box; }
            ${codigoCss}
          </style>
        </head>
        <body>
          ${codigoHtml}
        </body>
      </html>
    `;
    iframeRef.current.srcdoc = documentoHtml;
  };

  const executarValidacao = () => {
    tocarSom('executar');
    atualizarPreview();

    const resultados = desafio.criterios.map((c) => ({
      id: c.id,
      descricao: c.descricao,
      aprovado: c.validar(codigoHtml, codigoCss),
    }));

    setTestesResultado(resultados);
    const todosAprovados = resultados.every((r) => r.aprovado);
    setSucessoGeral(todosAprovados);

    if (todosAprovados) {
      tocarSom('vitoria');
      setAbaPainelDireito('testes');
      try {
        const salvas = localStorage.getItem('codequest_missoes_concluidas');
        const ids: number[] = salvas ? JSON.parse(salvas) : [];
        if (!ids.includes(desafio.id)) {
          ids.push(desafio.id);
          localStorage.setItem('codequest_missoes_concluidas', JSON.stringify(ids));
        }
      } catch (e) {}
      if (onConcluirDesafio) onConcluirDesafio(desafio.id);
    } else {
      tocarSom('erro');
      setAbaPainelDireito('testes');
    }
  };

  const restaurarCodigo = () => {
    setCodigoHtml(desafio.htmlInicial);
    setCodigoCss(desafio.cssInicial);
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(`${codigoHtml}\n\n/* CSS */\n${codigoCss}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const inserirSnippet = (snippet: string) => {
    if (abaCodigo === 'html') {
      setCodigoHtml((prev) => prev + '\n' + snippet);
    } else {
      setCodigoCss((prev) => prev + '\n' + snippet);
    }
  };

  return (
    <div className="space-y-4">
      {/* Seletor Superior de Fases */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {DESAFIOS_HTML_CSS.map((d) => {
          const selecionado = d.id === desafioId;
          return (
            <button
              key={d.id}
              onClick={() => setDesafioId(d.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition flex items-center gap-2 ${
                selecionado
                  ? 'bg-emerald-600 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-600/30 font-black'
                  : 'bg-slate-900 border-quest-border text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Fase {d.id}</span>
              <span className="text-[10px] opacity-75">+{d.xp}XP</span>
            </button>
          );
        })}
      </div>

      {/* Card Principal da IDE */}
      <Card className="border-quest-border bg-slate-900/90 shadow-2xl overflow-hidden">
        {/* Barra Superior de Informações da Missão */}
        <div className="p-4 bg-slate-950 border-b border-quest-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="cyan">HTML5 & CSS3</Badge>
              <Badge
                variant={
                  desafio.dificuldade === 'facil' ? 'success' : desafio.dificuldade === 'medio' ? 'warning' : 'danger'
                }
              >
                {desafio.dificuldade.toUpperCase()}
              </Badge>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +{desafio.xp} XP
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{desafio.titulo}</h3>
            <p className="text-xs text-slate-300">{desafio.descricao}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSomAtivo(!somAtivo)}
              className="text-xs text-slate-400 hover:text-white"
            >
              {somAtivo ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={restaurarCodigo}
              className="text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar</span>
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={executarValidacao}
              className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-600/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executar & Testar</span>
            </Button>
          </div>
        </div>

        {/* Corpo Dividido: Editor de Código à Esquerda vs Painel Interativo à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-quest-border">
          {/* LADO ESQUERDO: EDITOR DE CÓDIGO (HTML / CSS) */}
          <div className="flex flex-col bg-slate-950/60">
            {/* Abas HTML / CSS + Snippets */}
            <div className="p-2.5 bg-slate-950 border-b border-quest-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAbaCodigo('html')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    abaCodigo === 'html'
                      ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>index.html</span>
                </button>
                <button
                  onClick={() => setAbaCodigo('css')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    abaCodigo === 'css'
                      ? 'bg-cyan-600 text-slate-950 shadow-md shadow-cyan-600/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>style.css</span>
                </button>
              </div>

              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={copiarCodigo} className="text-xs p-1.5 text-slate-400">
                  {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>

            {/* Barra de Snippets Rápidos */}
            <div className="px-3 py-1.5 bg-slate-900/80 border-b border-quest-border flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-bold shrink-0">Snippets:</span>
              {abaCodigo === 'html' ? (
                <>
                  <button
                    onClick={() => inserirSnippet('<button class="btn-acao">Clique Aqui</button>')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono shrink-0 transition"
                  >
                    + &lt;button&gt;
                  </button>
                  <button
                    onClick={() => inserirSnippet('<div class="card-item">\n  <h3>Título</h3>\n  <p>Descrição</p>\n</div>')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono shrink-0 transition"
                  >
                    + &lt;div.card&gt;
                  </button>
                  <button
                    onClick={() => inserirSnippet('<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono shrink-0 transition"
                  >
                    + &lt;ul&gt;
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => inserirSnippet('display: flex;\njustify-content: center;\nalign-items: center;')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono shrink-0 transition"
                  >
                    + flex-center
                  </button>
                  <button
                    onClick={() => inserirSnippet('display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 12px;')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono shrink-0 transition"
                  >
                    + grid-3cols
                  </button>
                  <button
                    onClick={() => inserirSnippet('box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono shrink-0 transition"
                  >
                    + néon-shadow
                  </button>
                </>
              )}
            </div>

            {/* Textarea do Editor */}
            <div className="relative p-2 flex-1">
              {abaCodigo === 'html' ? (
                <textarea
                  value={codigoHtml}
                  onChange={(e) => setCodigoHtml(e.target.value)}
                  className="w-full h-[380px] bg-slate-950 text-emerald-300 font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                  spellCheck={false}
                />
              ) : (
                <textarea
                  value={codigoCss}
                  onChange={(e) => setCodigoCss(e.target.value)}
                  className="w-full h-[380px] bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
                  spellCheck={false}
                />
              )}
            </div>
          </div>

          {/* LADO DIREITO: PREVIEW / TESTES AUTOMATIZADOS / DICAS */}
          <div className="flex flex-col bg-slate-950/40">
            {/* Navegador de Abas do Painel Direito */}
            <div className="p-2.5 bg-slate-950 border-b border-quest-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAbaPainelDireito('preview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    abaPainelDireito === 'preview'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview Visual</span>
                </button>
                <button
                  onClick={() => setAbaPainelDireito('testes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    abaPainelDireito === 'testes'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Testes ({desafio.criterios.length})</span>
                </button>
                <button
                  onClick={() => setAbaPainelDireito('dicas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    abaPainelDireito === 'dicas'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dicas</span>
                </button>
              </div>

              {abaPainelDireito === 'preview' && (
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setLarguraPreview('100%')}
                    className={`p-1 rounded ${larguraPreview === '100%' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                    title="Desktop (100%)"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLarguraPreview('375px')}
                    className={`p-1 rounded ${larguraPreview === '375px' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                    title="Mobile (375px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Conteúdo da Aba Direita */}
            <div className="p-4 flex-1 flex flex-col">
              {/* ABA 1: PREVIEW VISUAL */}
              {abaPainelDireito === 'preview' && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div
                    className="w-full bg-[#030712] rounded-xl border border-slate-800 overflow-hidden shadow-2xl transition-all duration-300"
                    style={{ maxWidth: larguraPreview, height: '380px' }}
                  >
                    <iframe
                      ref={iframeRef}
                      title="Web Preview"
                      sandbox="allow-scripts"
                      className="w-full h-full border-0 bg-[#030712]"
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 font-mono">
                    Visualização em tempo real ({larguraPreview === '100%' ? 'Desktop' : 'Mobile 375px'})
                  </div>
                </div>
              )}

              {/* ABA 2: SUÍTE DE TESTES AUTOMATIZADOS */}
              {abaPainelDireito === 'testes' && (
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between border-b border-slate-800 pb-2">
                      <span>Critérios de Avaliação do Desafio</span>
                      {sucessoGeral === true && (
                        <span className="text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Desafio Concluído!
                        </span>
                      )}
                      {sucessoGeral === false && (
                        <span className="text-rose-400 flex items-center gap-1 font-bold">
                          <XCircle className="w-4 h-4" /> Ajuste o Código
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {desafio.criterios.map((criterio) => {
                        const res = testesResultado.find((t) => t.id === criterio.id);
                        const aprovado = res?.aprovado;
                        return (
                          <div
                            key={criterio.id}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between transition ${
                              res === undefined
                                ? 'bg-slate-950/70 border-slate-800 text-slate-400'
                                : aprovado
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950/40 border-rose-500 text-rose-300'
                            }`}
                          >
                            <span className="font-medium">{criterio.descricao}</span>
                            {res === undefined ? (
                              <span className="text-[10px] text-slate-500">Pendente</span>
                            ) : aprovado ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {sucessoGeral === true && desafioId < DESAFIOS_HTML_CSS.length && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setDesafioId((prev) => prev + 1)}
                      className="w-full text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold"
                    >
                      <span>Avançar para a Próxima Fase ({desafioId + 1})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              )}

              {/* ABA 3: DICAS & OBJETIVO */}
              {abaPainelDireito === 'dicas' && (
                <div className="space-y-4 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-amber-400 block">🎯 Objetivo Principal</span>
                    <p className="leading-relaxed text-slate-300">{desafio.objetivo}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-900/60 space-y-1.5">
                    <span className="font-bold text-indigo-300 block">💡 Dica do Mestre</span>
                    <p className="leading-relaxed text-slate-300">{desafio.dica}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

