import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Sparkles,
  Terminal,
  Trophy,
  ArrowRight,
  Flame,
  Github,
  CheckCircle2,
  Lock,
  Code2,
  Users2,
  Compass,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { UNIVERSOS_VALIDOS } from '@/types';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center">
      {/* HERO SECTION */}
      <section className="w-full relative overflow-hidden py-16 md:py-24 px-4 border-b border-quest-border bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 flex flex-col items-center text-center">
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs sm:text-sm font-medium mb-8 shadow-inner animate-in fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Temporada 1: O Despertar do Desenvolvedor Júnior</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            Sua jornada de programação transformada em um{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300">
              RPG épico
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Abandone perfis estáticos e sem vida. No <strong>CodeQuest</strong>, você cria sua ficha de personagem, conquista missões práticas e transforma sua atividade real do GitHub em poder de combate verificável.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
            <Link href="/cadastro" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 text-base font-semibold px-8 py-3.5">
                <Flame className="w-5 h-5 text-amber-300" />
                Criar Minha Ficha
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/fichas" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-slate-200 text-base px-6 py-3.5">
                <Shield className="w-4 h-4 mr-2 text-indigo-400" />
                Explorar Personagens
              </Button>
            </Link>
          </div>

          {/* MOCKUP INTERATIVO DA FICHA DE PERSONAGEM */}
          <div className="w-full max-w-2xl text-left bg-gradient-to-b from-slate-900 to-slate-950 border border-quest-border rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  ⚔️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Aragorn Dev</h3>
                    <Badge variant="purple">Tolkien</Badge>
                  </div>
                  <p className="text-xs text-slate-400">Classe: Guardião Fullstack • Nível 14</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ficha Ativa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Poder de Combate
                  </span>
                  <strong className="text-white font-mono text-sm">85 / 100</strong>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-400 h-2.5 rounded-full w-[85%]" />
                </div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Github className="w-5 h-5 text-slate-300" />
                  <div>
                    <p className="text-xs font-medium text-white">@aragorn-coder</p>
                    <p className="text-[11px] text-slate-400">24 repos • 182 estrelas</p>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  Verificado
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-400 border-t border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 18 Missões Concluídas na Trilha
              </span>
              <span className="text-slate-500 font-mono text-[11px]">Audit ID #0094-CQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="w-full py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">
            Mecânicas da Plataforma
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Como o CodeQuest Funciona
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Uma abordagem neutra e transparente para demonstrar sua evolução em código, sem penalizar repositórios privados ou iniciantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-quest-border bg-slate-900/40 relative group hover:border-indigo-500/60 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl text-white">1. Crie sua Ficha</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400 leading-relaxed">
              Escolha seu universo temático favorito, batize seu herói e defina sua classe inicial. Apenas 1 ficha ativa por usuário para garantir foco na sua jornada.
            </CardContent>
          </Card>

          <Card className="border-quest-border bg-slate-900/40 relative group hover:border-cyan-500/60 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl text-white">2. Conquiste Missões</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400 leading-relaxed">
              Percorra a trilha pedagógica estruturada (Blocos, Python, HTML/CSS e JavaScript). Cada desafio resolvido eleva seu poder e adiciona vitórias ao seu histórico.
            </CardContent>
          </Card>

          <Card className="border-quest-border bg-slate-900/40 relative group hover:border-amber-500/60 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Github className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl text-white">3. Conecte o GitHub</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400 leading-relaxed">
              Vincule seu usuário do GitHub com consulta resiliente em cache de 1 hora. Seus projetos reais validam sua experiência no ranking geral da guilda.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* OS 7 UNIVERSOS OFICIAIS (RF03) */}
      <section className="w-full py-16 px-4 bg-slate-950/80 border-y border-quest-border">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="purple" className="mb-3">
            Lista Oficial Fechada
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Escolha seu Universo de RPG
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-10">
            Conforme a regra de negócio do CodeQuest (RN02), toda ficha de personagem pertence estritamente a um dos 7 universos da comunidade.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {UNIVERSOS_VALIDOS.map((universo) => (
              <span
                key={universo}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium hover:border-indigo-500 hover:text-white hover:bg-slate-800 transition-all cursor-default"
              >
                ⚔️ {universo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRILHA DE APRENDIZAGEM PREVIEW (RF13) */}
      <section className="w-full py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="cyan" className="mb-2">
              Currículo Pedagógico
            </Badge>
            <h2 className="text-3xl font-bold text-white">Trilha de Aprendizagem em 4 Módulos</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Projetada para desenvolvedores júniores e estudantes de TI que desejam consolidar uma base prática sólida.
            </p>
          </div>
          <Link href="/trilha">
            <Button variant="outline" size="sm" className="gap-1.5 self-start">
              <Compass className="w-4 h-4" />
              Explorar Todos os Módulos
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400">MÓDULO 01</span>
              <h4 className="font-bold text-white text-base mt-1 mb-2">Programação em Blocos</h4>
              <p className="text-xs text-slate-400">Raciocínio algorítmico, variáveis e tomada de decisão lógica.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-indigo-400 font-semibold flex items-center justify-between">
              <span>Fundamentos</span>
              <span>→</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400">MÓDULO 02</span>
              <h4 className="font-bold text-white text-base mt-1 mb-2">Linguagem Python</h4>
              <p className="text-xs text-slate-400">Sintaxe limpa, manipulação de arquivos e coleções essenciais.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-cyan-400 font-semibold flex items-center justify-between">
              <span>Backend & Scripts</span>
              <span>→</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">MÓDULO 03</span>
              <h4 className="font-bold text-white text-base mt-1 mb-2">HTML5 e CSS3 Modernos</h4>
              <p className="text-xs text-slate-400">Semântica, responsividade, flexbox, grid e acessibilidade na web.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-amber-400 font-semibold flex items-center justify-between">
              <span>Frontend Base</span>
              <span>→</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400">MÓDULO 04</span>
              <h4 className="font-bold text-white text-base mt-1 mb-2">JavaScript & APIs</h4>
              <p className="text-xs text-slate-400">Manipulação dinâmica de DOM, requisições fetch assíncronas e eventos.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-emerald-400 font-semibold flex items-center justify-between">
              <span>Aplicações Web</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURANÇA E CONFORMIDADE */}
      <section className="w-full py-16 px-4 bg-slate-900/30 border-t border-quest-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Lock className="w-6 h-6 text-indigo-400 mb-3" />
            <h4 className="font-semibold text-white text-base mb-1">Segurança e Sessões Estritas</h4>
            <p className="text-xs text-slate-400">
              Cookies HttpOnly/Secure, senhas com bcrypt (custo ≥ 10), revogação global de sessões e rate limiting protetor.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <Shield className="w-6 h-6 text-cyan-400 mb-3" />
            <h4 className="font-semibold text-white text-base mb-1">Auditoria Inviolável</h4>
            <p className="text-xs text-slate-400">
              Registros imutáveis (append-only) de toda criação, alteração ou arquivamento de fichas para transparência total.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-3" />
            <h4 className="font-semibold text-white text-base mb-1">Privacidade & LGPD</h4>
            <p className="text-xs text-slate-400">
              Exportação dos seus dados em JSON a qualquer momento, controle de visibilidade e anonimização com exclusão garantida.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="w-full py-20 px-4 text-center relative overflow-hidden bg-gradient-to-t from-indigo-950/40 to-slate-950">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Pronto para iniciar sua campanha?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Junte-se à guilda de desenvolvedores, crie sua ficha e comece a pontuar ainda hoje.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 font-semibold px-8 py-3.5 shadow-xl shadow-indigo-600/30 text-base">
              Cadastre-se Gratuitamente
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
