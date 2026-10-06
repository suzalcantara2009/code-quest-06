import React from 'react';
import Link from 'next/link';
import { Compass, Blocks, Code, FileCode, Layers, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const MODULOS_TRILHA = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Módulo 1 — Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao: 'Fundamentos de lógica algorítmica, variáveis, condicionais e laços visuais.',
    icone: Blocks,
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Módulo 2 — Python',
    tecnologia: 'Python',
    descricao: 'Sintaxe limpa, estruturas de dados, funções e scripts orientados a objetos.',
    icone: Code,
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Módulo 3 — HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao: 'Estruturação semântica, acessibilidade e estilização responsiva para a web.',
    icone: FileCode,
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Módulo 4 — JavaScript',
    tecnologia: 'JavaScript',
    descricao: 'Interatividade no navegador, manipulação de DOM e consumo de APIs assíncronas.',
    icone: Layers,
  },
];

export default function TrilhaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-400 text-xs mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Trilha Pedagógica</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Trilha de Aprendizagem</h1>
        <p className="text-sm text-slate-400">
          Percorra os 4 módulos estruturados para consolidar seus conhecimentos e desbloquear novas missões.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULOS_TRILHA.map((m) => {
          const Icon = m.icone;
          return (
            <Link key={m.id} href={`/trilha/${m.id}`} className="group">
              <Card className="h-full hover:border-indigo-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-900/50">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="purple">{m.tecnologia}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-indigo-400 transition-colors">
                    {m.titulo}
                  </CardTitle>
                  <CardDescription>{m.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 flex items-center justify-end text-sm text-indigo-400 font-medium">
                  <span>Acessar Módulo</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
