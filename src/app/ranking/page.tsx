import React from 'react';
import { Trophy } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function RankingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Ranking de Personagens</h1>
        <p className="text-sm text-slate-400">
          Os desenvolvedores com maior poder de combate calculado por missões e atividade no GitHub.
        </p>
      </div>

      <div className="flex-1">
        <EmptyState
          icone={<Trophy className="w-12 h-12" />}
          titulo="Ranking em Construção"
          descricao="O cálculo e o ranking público de personagens mais poderosos estarão disponíveis em breve."
        />
      </div>
    </div>
  );
}
