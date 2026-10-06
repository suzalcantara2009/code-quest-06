'use client';

import React from 'react';
import Link from 'next/link';
import { ArchiveRestore, ArrowLeft, Archive } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function FichasArquivadasPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="mb-6">
        <Link href="/fichas" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem pública
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Fichas Arquivadas</h1>
        <p className="text-sm text-slate-400">
          Consulte suas fichas inativas e restaure um personagem quando desejar (RN06: apenas 1 ficha ativa por usuário).
        </p>
      </div>

      <div className="flex-1">
        <EmptyState
          icone={<Archive className="w-12 h-12" />}
          titulo="Nenhuma ficha arquivada"
          descricao="Você não possui fichas inativas no momento."
        />
      </div>
    </div>
  );
}
