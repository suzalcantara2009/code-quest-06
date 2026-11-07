'use client';

import React, { useState } from 'react';
import {
  FileCode,
  Layout,
  Palette,
  Columns,
  Grid,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Eye,
  Smartphone,
  Monitor,
  Flame,
  Shield,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AulaHtmlCssData {
  id: number;
  titulo: string;
  subtitulo: string;
  duracao: string;
  icone: any;
  descricao: string;
  conceitoChave: string;
}

const AULAS_HTML_CSS: AulaHtmlCssData[] = [
  {
    id: 1,
    titulo: '1. O Esqueleto da Web: HTML5 Semântico',
    subtitulo: 'Estruturação lógica, tags semânticas e acessibilidade para o seu pergaminho digital',
    duracao: '15 min',
    icone: FileCode,
    descricao:
      'Se uma página web fosse um herói de RPG, o HTML seria o seu esqueleto. Ele define onde fica a cabeça, o tronco e os membros através de tags semânticas como <header>, <main>, <article> e <footer>.',
    conceitoChave:
      'Tags semânticas dão significado real aos dados, facilitando a vida de leitores de tela e motores de busca.',
  },
  {
    id: 2,
    titulo: '2. O Modelo de Caixa (CSS Box Model)',
    subtitulo: 'Margin, Border, Padding e Content: como os elementos ocupam espaço na tela',
    duracao: '20 min',
    icone: Layout,
    descricao:
      'Cada elemento na web é uma caixa retangular invisível composta por 4 camadas concêntricas: Conteúdo (o texto ou imagem), Padding (espaçamento interno), Border (a moldura) e Margin (espaçamento externo para vizinhos).',
    conceitoChave:
      'Dominar o Box Model é o segredo para nunca mais sofrer com elementos desalinhados ou vazando da tela.',
  },
  {
    id: 3,
    titulo: '3. Cores, Gradientes & Estilos Arcanos',
    subtitulo: 'Dando vida, brilho néon e identidade visual aos elementos',
    duracao: '15 min',
    icone: Palette,
    descricao:
      'O CSS é a armadura e a pele do herói. Aqui aprendemos a aplicar paletas de cores (Hex, RGB), gradientes lineares (linear-gradient), sombras iluminadas (box-shadow) e cantos arredondados (border-radius).',
    conceitoChave:
      'Boas cores e sombras com contraste adequado transformam um documento sem graça em uma interface épica.',
  },
  {
    id: 4,
    titulo: '4. O Mestre do Flexbox',
    subtitulo: 'Alinhamento unidimensional, distribuição dinâmica e centralização perfeita',
    duracao: '25 min',
    icone: Columns,
    descricao:
      'O Flexbox é a ferramenta mágica número 1 para organizar elementos em linha ou coluna. Com justify-content e align-items, centralizar itens ou espaçá-los igualmente torna-se simples e limpo.',
    conceitoChave:
      'Use display: flex no container-pai para controlar instantaneamente a orientação e o alinhamento dos filhos.',
  },
  {
    id: 5,
    titulo: '5. O Códice do CSS Grid',
    subtitulo: 'Layouts bidimensionais, matrizes de inventário e grades de habilidades',
    duracao: '25 min',
    icone: Grid,
    descricao:
      'Enquanto o Flexbox cuida de linhas OU colunas, o CSS Grid domina linhas E colunas simultaneamente. É ideal para criar painéis de inventário, mapas de tiles e dashboards de aventureiros.',
    conceitoChave:
      'grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) cria grades fluidas e responsivas sem esforço.',
  },
  {
    id: 6,
    titulo: '6. Responsividade & Animações Místicas',
    subtitulo: '@media queries para qualquer tela e @keyframes para dar movimento e energia',
    duracao: '20 min',
    icone: Sparkles,
    descricao:
      'Uma interface moderna deve rodar tão bem no celular (mobile) quanto no monitor ultrawide do mestre. Combinamos Media Queries com animações fluidas @keyframes para dar pulso e dinamismo à magia.',
    conceitoChave:
      'Adapte seu layout com @media (min-width: 768px) e crie animações suaves na GPU com transform e opacity.',
  },
];

interface AulasHtmlCssProps {
  onIrParaLaboratorio?: (desafioId?: number) => void;
}

export function AulasHtmlCss({ onIrParaLaboratorio }: AulasHtmlCssProps) {
  const [aulaAtualId, setAulaAtualId] = useState<number>(1);

  // Estados dos Mini-Simuladores:
  // Simulador 1: Construtor de Pergaminho HTML
  const [elementosPergaminho, setElementosPergaminho] = useState<{
    temCabecalho: boolean;
    temDescricao: boolean;
    temRecompensas: boolean;
    temBotao: boolean;
  }>({
    temCabecalho: true,
    temDescricao: true,
    temRecompensas: true,
    temBotao: true,
  });

  // Simulador 2: Box Model
  const [boxMargin, setBoxMargin] = useState(16);
  const [boxBorder, setBoxBorder] = useState(4);
  const [boxPadding, setBoxPadding] = useState(18);

  // Simulador 3: Forja de Cristais CSS
  const [corCristal, setCorCristal] = useState<'cyan' | 'purple' | 'amber' | 'emerald'>('cyan');
  const [brilhoIntensidade, setBrilhoIntensidade] = useState(16);
  const [arredondamento, setArredondamento] = useState(12);

  // Simulador 4: Flexbox
  const [flexDirecao, setFlexDirecao] = useState<'row' | 'column'>('row');
  const [flexJustify, setFlexJustify] = useState<'flex-start' | 'center' | 'space-between' | 'space-around'>('center');
  const [flexAlign, setFlexAlign] = useState<'flex-start' | 'center' | 'flex-end'>('center');

  // Simulador 5: CSS Grid
  const [gridColunas, setGridColunas] = useState<number>(3);
  const [gridGap, setGridGap] = useState<number>(12);

  // Simulador 6: Responsividade & Keyframes
  const [tamanhoDispositivo, setTamanhoDispositivo] = useState<'mobile' | 'desktop'>('desktop');
  const [animandoMana, setAnimandoMana] = useState(true);

  const aulaAtual = AULAS_HTML_CSS.find((a) => a.id === aulaAtualId) || AULAS_HTML_CSS[0];

  return (
    <div className="space-y-6">
      {/* Navegador Superior de Aulas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {AULAS_HTML_CSS.map((aula) => {
          const Icone = aula.icone;
          const selecionada = aula.id === aulaAtualId;
          return (
            <button
              key={aula.id}
              onClick={() => setAulaAtualId(aula.id)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                selecionada
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/20 text-white'
                  : 'bg-slate-900/60 border-quest-border hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icone className={`w-4 h-4 ${selecionada ? 'text-emerald-400' : 'text-slate-500'}`} />
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

      {/* Conteúdo Principal da Aula */}
      <Card className="border-quest-border bg-slate-900/90 shadow-xl overflow-hidden">
        <CardHeader className="border-b border-quest-border pb-4 bg-slate-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan">Módulo 3: HTML & CSS</Badge>
                <Badge variant="success">Aula Interativa {aulaAtual.id} de 6</Badge>
              </div>
              <CardTitle className="text-xl sm:text-2xl text-white">{aulaAtual.titulo}</CardTitle>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{aulaAtual.subtitulo}</p>
            </div>
            {onIrParaLaboratorio && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onIrParaLaboratorio(aulaAtual.id)}
                className="text-xs gap-1.5 shrink-0 border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/40"
              >
                <span>Praticar no Laboratório</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Caixa de Contexto Pedagógico */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-sm leading-relaxed">
            <p className="mb-2">{aulaAtual.descricao}</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded-lg">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Conceito-Chave: {aulaAtual.conceitoChave}</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 1: CONSTRUTOR DE PERGAMINHO HTML5 */}
          {/* ========================================================= */}
          {aulaAtual.id === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Mini-Simulador: Construtor Semântico de Pergaminho
                </span>
                <span className="text-[11px] text-slate-400">Alterne as tags para ver o HTML gerado e a renderização</span>
              </div>

              {/* Controles do Simulador */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setElementosPergaminho((prev) => ({ ...prev, temCabecalho: !prev.temCabecalho }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    elementosPergaminho.temCabecalho
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  &lt;header&gt; Título & Badge
                </button>
                <button
                  onClick={() =>
                    setElementosPergaminho((prev) => ({ ...prev, temDescricao: !prev.temDescricao }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    elementosPergaminho.temDescricao
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  &lt;p&gt; Enunciado da Missão
                </button>
                <button
                  onClick={() =>
                    setElementosPergaminho((prev) => ({ ...prev, temRecompensas: !prev.temRecompensas }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    elementosPergaminho.temRecompensas
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  &lt;ul&gt; Lista de Recompensas
                </button>
                <button
                  onClick={() =>
                    setElementosPergaminho((prev) => ({ ...prev, temBotao: !prev.temBotao }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    elementosPergaminho.temBotao
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  &lt;button&gt; Ação Aceitar
                </button>
              </div>

              {/* Grid Lado a Lado: Código HTML vs Renderização Visual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Código HTML Gerado */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                  <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
                    <span>Estrutura Semântica (HTML)</span>
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <pre className="text-emerald-300 leading-relaxed">
{`<!-- Pergaminho Semântico -->
<article class="pergaminho-missao">
${elementosPergaminho.temCabecalho ? `  <header>
    <h2>O Covil do Dragão de Jade</h2>
    <span class="badge">Nível 5</span>
  </header>` : '  <!-- Sem header -->'}
${elementosPergaminho.temDescricao ? `  <section class="descricao">
    <p>Adentre a caverna ancestral e recupere o amuleto.</p>
  </section>` : ''}
${elementosPergaminho.temRecompensas ? `  <section class="recompensas">
    <h3>Recompensas:</h3>
    <ul>
      <li>500 Moedas de Ouro</li>
      <li>Espada Esmeralda</li>
    </ul>
  </section>` : ''}
${elementosPergaminho.temBotao ? `  <footer>
    <button type="button">Aceitar Desafio</button>
  </footer>` : ''}
</article>`}
                  </pre>
                </div>

                {/* Renderização Visual Simulada */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-center items-center">
                  <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1 w-full flex items-center justify-between">
                    <span>Renderização no Navegador</span>
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  </div>

                  <article className="w-full max-w-sm rounded-xl bg-slate-900 border-2 border-emerald-500/60 p-4 shadow-xl space-y-3">
                    {elementosPergaminho.temCabecalho && (
                      <header className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <h2 className="text-sm font-bold text-emerald-300">O Covil do Dragão de Jade</h2>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Nível 5
                        </span>
                      </header>
                    )}

                    {elementosPergaminho.temDescricao && (
                      <section>
                        <p className="text-xs text-slate-300">
                          Adentre a caverna ancestral e recupere o amuleto guardado pelo dragão lendário.
                        </p>
                      </section>
                    )}

                    {elementosPergaminho.temRecompensas && (
                      <section className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[11px] font-bold text-amber-400 block mb-1">Recompensas:</span>
                        <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                          <li>500 Moedas de Ouro 🪙</li>
                          <li>Espada Esmeralda ⚔️</li>
                        </ul>
                      </section>
                    )}

                    {elementosPergaminho.temBotao && (
                      <footer>
                        <button className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-600/30 transition">
                          Aceitar Desafio ⚔️
                        </button>
                      </footer>
                    )}
                  </article>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 2: CSS BOX MODEL */}
          {/* ========================================================= */}
          {aulaAtual.id === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Layout className="w-4 h-4" /> Mini-Simulador: As 4 Camadas do Box Model
                </span>
                <span className="text-[11px] text-slate-400">Ajuste os controles deslizantes para ver o impacto visual</span>
              </div>

              {/* Sliders de Ajuste */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs text-amber-400 mb-1 font-semibold">
                    <span>Margin (Externo):</span>
                    <span>{boxMargin}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={boxMargin}
                    onChange={(e) => setBoxMargin(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-emerald-400 mb-1 font-semibold">
                    <span>Border (Borda):</span>
                    <span>{boxBorder}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={boxBorder}
                    onChange={(e) => setBoxBorder(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-cyan-400 mb-1 font-semibold">
                    <span>Padding (Interno):</span>
                    <span>{boxPadding}px</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="36"
                    value={boxPadding}
                    onChange={(e) => setBoxPadding(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Visualização Concêntrica das Caixas */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center">
                <div
                  className="rounded-xl border border-dashed border-amber-500/60 bg-amber-500/10 text-center transition-all duration-200"
                  style={{ padding: `${boxMargin}px` }}
                >
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                    Margin ({boxMargin}px)
                  </span>

                  <div
                    className="rounded-lg bg-emerald-500/20 border-emerald-500 transition-all duration-200"
                    style={{ borderWidth: `${boxBorder}px` }}
                  >
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block py-0.5">
                      Border ({boxBorder}px)
                    </span>

                    <div
                      className="rounded bg-cyan-500/20 text-center transition-all duration-200"
                      style={{ padding: `${boxPadding}px` }}
                    >
                      <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                        Padding ({boxPadding}px)
                      </span>

                      <div className="bg-indigo-600 px-4 py-3 rounded text-white font-bold text-xs shadow-md">
                        🛡️ Conteúdo do Card (Content)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-400 font-mono text-center">
                  Largura Total = Conteúdo + 2×({boxPadding}px Padding) + 2×({boxBorder}px Border) + 2×({boxMargin}px Margin)
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 3: CORES & BRILHO NÉON */}
          {/* ========================================================= */}
          {aulaAtual.id === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Palette className="w-4 h-4" /> Mini-Simulador: A Forja do Cristal Arcano
                </span>
                <span className="text-[11px] text-slate-400">Escolha a runa e a intensidade luminosa</span>
              </div>

              {/* Controles de Cores */}
              <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Elemento:</span>
                <button
                  onClick={() => setCorCristal('cyan')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    corCristal === 'cyan' ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Gelo Ancestral (Ciano)
                </button>
                <button
                  onClick={() => setCorCristal('purple')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    corCristal === 'purple' ? 'bg-purple-950 border-purple-400 text-purple-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Vazio Noturno (Roxo)
                </button>
                <button
                  onClick={() => setCorCristal('amber')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    corCristal === 'amber' ? 'bg-amber-950 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Fogo Solar (Âmbar)
                </button>
                <button
                  onClick={() => setCorCristal('emerald')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    corCristal === 'emerald' ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Vida Élfica (Esmeralda)
                </button>
              </div>

              {/* Sliders de Brilho e Border-Radius */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                    <span>Brilho Néon (box-shadow):</span>
                    <span>{brilhoIntensidade}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={brilhoIntensidade}
                    onChange={(e) => setBrilhoIntensidade(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                    <span>Arredondamento (border-radius):</span>
                    <span>{arredondamento}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={arredondamento}
                    onChange={(e) => setArredondamento(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Demonstração do Cristal com Efeito Néon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-8 flex items-center justify-center min-h-[160px]">
                  {(() => {
                    const corHex =
                      corCristal === 'cyan'
                        ? '#06b6d4'
                        : corCristal === 'purple'
                        ? '#a855f7'
                        : corCristal === 'amber'
                        ? '#f59e0b'
                        : '#10b981';
                    return (
                      <div
                        className="w-36 h-36 flex flex-col items-center justify-center text-center p-3 font-bold text-white transition-all duration-300 border-2"
                        style={{
                          backgroundColor: '#0f172a',
                          borderColor: corHex,
                          borderRadius: `${arredondamento}px`,
                          boxShadow: `0 0 ${brilhoIntensidade}px ${corHex}`,
                        }}
                      >
                        <Sparkles className="w-8 h-8 mb-1" style={{ color: corHex }} />
                        <span className="text-xs uppercase tracking-wider">Cristal Ativo</span>
                      </div>
                    );
                  })()}
                </div>

                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1">
                    CSS Gerado
                  </div>
                  <pre className="text-emerald-300 leading-relaxed">
{`.cristal-magico {
  background-color: #0f172a;
  border: 2px solid ${
    corCristal === 'cyan' ? '#06b6d4' : corCristal === 'purple' ? '#a855f7' : corCristal === 'amber' ? '#f59e0b' : '#10b981'
  };
  border-radius: ${arredondamento}px;
  box-shadow: 0 0 ${brilhoIntensidade}px ${
    corCristal === 'cyan' ? '#06b6d4' : corCristal === 'purple' ? '#a855f7' : corCristal === 'amber' ? '#f59e0b' : '#10b981'
  };
  transition: all 0.3s ease;
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 4: FLEXBOX */}
          {/* ========================================================= */}
          {aulaAtual.id === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Columns className="w-4 h-4" /> Mini-Simulador: A Forja do Flexbox
                </span>
                <span className="text-[11px] text-slate-400">Alterne direção e alinhamento em tempo real</span>
              </div>

              {/* Botões de Flexbox */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">flex-direction:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setFlexDirecao('row')}
                      className={`px-2.5 py-1 rounded text-xs font-bold border transition ${
                        flexDirecao === 'row' ? 'bg-emerald-600 text-slate-950 border-emerald-500' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      row (linha)
                    </button>
                    <button
                      onClick={() => setFlexDirecao('column')}
                      className={`px-2.5 py-1 rounded text-xs font-bold border transition ${
                        flexDirecao === 'column' ? 'bg-emerald-600 text-slate-950 border-emerald-500' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      column (coluna)
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">justify-content (eixo principal):</span>
                  <div className="flex flex-wrap gap-1">
                    {(['flex-start', 'center', 'space-between', 'space-around'] as const).map((j) => (
                      <button
                        key={j}
                        onClick={() => setFlexJustify(j)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                          flexJustify === j ? 'bg-cyan-600 text-slate-950 border-cyan-500' : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        {j.replace('flex-', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">align-items (eixo cruzado):</span>
                  <div className="flex gap-1">
                    {(['flex-start', 'center', 'flex-end'] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => setFlexAlign(a)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                          flexAlign === a ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        {a.replace('flex-', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arena Flexbox com Animação */}
              <div
                className="bg-slate-950 rounded-xl border border-slate-800 p-4 min-h-[220px] flex gap-3 transition-all duration-300"
                style={{
                  flexDirection: flexDirecao,
                  justifyContent: flexJustify,
                  alignItems: flexAlign,
                }}
              >
                <div className="bg-indigo-600/90 text-white border border-indigo-400 p-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold">
                  <span>🧪 Poção de Vida</span>
                </div>
                <div className="bg-cyan-600/90 text-white border border-cyan-400 p-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold">
                  <span>🌀 Elixir de Mana</span>
                </div>
                <div className="bg-amber-600/90 text-white border border-amber-400 p-3 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold">
                  <span>⚡ Poção de Velocidade</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <span className="text-slate-500">.container-itens &#123;</span>
                <div className="pl-4 text-emerald-300">
                  display: flex;<br />
                  flex-direction: {flexDirecao};<br />
                  justify-content: {flexJustify};<br />
                  align-items: {flexAlign};<br />
                  gap: 12px;
                </div>
                <span className="text-slate-500">&#125;</span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 5: CSS GRID */}
          {/* ========================================================= */}
          {aulaAtual.id === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Grid className="w-4 h-4" /> Mini-Simulador: A Grade de Habilidades do Guardião
                </span>
                <span className="text-[11px] text-slate-400">Ajuste colunas e o gap da matriz</span>
              </div>

              {/* Controles de Colunas e Gap */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Colunas na Grade:</span>
                  {[2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGridColunas(num)}
                      className={`px-3 py-1 rounded text-xs font-bold border transition ${
                        gridColunas === num ? 'bg-emerald-600 text-slate-950 border-emerald-500' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {num} colunas
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Espaçamento (gap):</span>
                  {[8, 12, 16, 24].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGridGap(g)}
                      className={`px-2.5 py-1 rounded text-xs font-bold border transition ${
                        gridGap === g ? 'bg-cyan-600 text-slate-950 border-cyan-500' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {g}px
                    </button>
                  ))}
                </div>
              </div>

              {/* Matriz CSS Grid */}
              <div
                className="bg-slate-950 rounded-xl border border-slate-800 p-4 transition-all duration-300"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridColunas}, minmax(0, 1fr))`,
                  gap: `${gridGap}px`,
                }}
              >
                {[
                  { icone: '🔥', nome: 'Bola de Fogo' },
                  { icone: '❄️', nome: 'Nevasca' },
                  { icone: '⚡', nome: 'Raio Cósmico' },
                  { icone: '🛡️', nome: 'Barreira Arcana' },
                  { icone: '🗡️', nome: 'Lâmina Espiritual' },
                  { icone: '🦅', nome: 'Invocação Alada' },
                ].map((hab, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500 hover:scale-[1.02] transition cursor-pointer"
                  >
                    <span className="text-2xl mb-1">{hab.icone}</span>
                    <span className="text-xs font-bold text-slate-200">{hab.nome}</span>
                    <span className="text-[10px] text-slate-400">Slot #{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <span className="text-slate-500">.grid-habilidades &#123;</span>
                <div className="pl-4 text-emerald-300">
                  display: grid;<br />
                  grid-template-columns: repeat({gridColunas}, minmax(0, 1fr));<br />
                  gap: {gridGap}px;
                </div>
                <span className="text-slate-500">&#125;</span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MINI-SIMULADOR AULA 6: RESPONSIVIDADE & KEYFRAMES */}
          {/* ========================================================= */}
          {aulaAtual.id === 6 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Mini-Simulador: Media Query & Pulsação @keyframes
                </span>
                <span className="text-[11px] text-slate-400">Alterne a largura de tela simulada e o efeito de pulso</span>
              </div>

              {/* Controles de Tela e Efeito */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Simulação de Tela:</span>
                  <button
                    onClick={() => setTamanhoDispositivo('mobile')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition ${
                      tamanhoDispositivo === 'mobile'
                        ? 'bg-emerald-600 text-slate-950 border-emerald-500'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (&lt;768px)</span>
                  </button>
                  <button
                    onClick={() => setTamanhoDispositivo('desktop')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition ${
                      tamanhoDispositivo === 'desktop'
                        ? 'bg-emerald-600 text-slate-950 border-emerald-500'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop (&ge;768px)</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAnimandoMana(!animandoMana)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      animandoMana ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                    {animandoMana ? '✨ @keyframes Ativo' : '⏸️ Parar Animação'}
                  </button>
                </div>
              </div>

              {/* Viewport Simulado */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex justify-center">
                <div
                  className={`border border-slate-700 rounded-2xl bg-slate-900 p-4 transition-all duration-300 ${
                    tamanhoDispositivo === 'mobile' ? 'w-full max-w-[320px]' : 'w-full max-w-xl'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
                    <span>{tamanhoDispositivo === 'mobile' ? '📱 Visão Smartphone' : '💻 Visão Monitor'}</span>
                    <span className="text-emerald-400 font-mono">
                      {tamanhoDispositivo === 'mobile' ? 'width: 320px' : 'width: 100%'}
                    </span>
                  </div>

                  <div
                    className={`gap-4 transition-all ${
                      tamanhoDispositivo === 'mobile' ? 'flex flex-col' : 'grid grid-cols-2'
                    }`}
                  >
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-xl shrink-0">
                        🧙‍♂️
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Mago Astral</div>
                        <div className="text-[11px] text-slate-400">Nível 15 • Guardião</div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-cyan-400">Energia Mana</span>
                        <span className="text-slate-300">85 / 100</span>
                      </div>
                      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all ${
                            animandoMana ? 'animate-pulse' : ''
                          }`}
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
              Aula {aulaAtualId} de {AULAS_HTML_CSS.length}
            </span>

            {aulaAtualId < AULAS_HTML_CSS.length ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setAulaAtualId((prev) => Math.min(AULAS_HTML_CSS.length, prev + 1))}
                className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold"
              >
                <span>Próxima Aula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : onIrParaLaboratorio ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onIrParaLaboratorio(1)}
                className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold"
              >
                <span>Ir para o Laboratório Web</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

