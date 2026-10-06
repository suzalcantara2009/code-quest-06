'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Filter, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { UNIVERSOS_VALIDOS, Universo } from '@/types';

export default function FichasPage() {
  const [busca, setBusca] = useState('');
  const [universoSelecionado, setUniversoSelecionado] = useState<Universo | ''>('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Personagens Ativos</h1>
          <p className="text-sm text-slate-400">
            Explore as fichas de desenvolvedores na plataforma ou crie a sua própria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/fichas/arquivadas">
            <Button variant="ghost" size="sm">
              Fichas Arquivadas
            </Button>
          </Link>
          <Link href="/fichas/nova">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" />
              Nova Ficha
            </Button>
          </Link>
        </div>
      </div>

      {/* Barra de Filtros e Busca (RF08) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-900/60 p-4 rounded-xl border border-quest-border">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou classe..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={universoSelecionado}
            onChange={(e) => setUniversoSelecionado(e.target.value as Universo | '')}
            className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">Todos os Universos</option>
            {UNIVERSOS_VALIDOS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Fichas ou Estado Vazio (RI03) */}
      <div className="flex-1">
        <EmptyState
          icone={<Shield className="w-12 h-12" />}
          titulo="Nenhum personagem encontrado"
          descricao="Não foram encontradas fichas ativas com os filtros informados."
          acao={
            <Link href="/fichas/nova">
              <Button size="sm">Criar Ficha de Personagem</Button>
            </Link>
          }
        />
      </div>

      {/* Paginação (RF07, RI10) */}
      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        aoMudarPagina={(p) => setPaginaAtual(p)}
      />
    </div>
  );
}
