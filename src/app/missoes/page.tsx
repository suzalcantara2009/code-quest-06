'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Target, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function MissoesPage() {
  const [dificuldade, setDificuldade] = useState<string>('');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Catálogo de Missões</h1>
          <p className="text-sm text-slate-400">
            Resolva desafios de programação para ganhar experiência e aumentar o poder da sua ficha.
          </p>
        </div>
      </div>

      {/* Filtros de Missões (RF14a) */}
      <div className="flex items-center gap-4 mb-8 bg-slate-900/60 p-4 rounded-xl border border-quest-border">
        <Filter className="w-4 h-4 text-slate-400" />
        <select
          value={dificuldade}
          onChange={(e) => setDificuldade(e.target.value)}
          className="py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="">Todas as Dificuldades</option>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>

      <div className="flex-1">
        <EmptyState
          icone={<Target className="w-12 h-12" />}
          titulo="Nenhuma missão disponível"
          descricao="Não foram encontradas missões para os filtros selecionados."
        />
      </div>
    </div>
  );
}
