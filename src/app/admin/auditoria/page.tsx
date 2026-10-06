import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AdminAuditoriaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="mb-6">
        <Link href="/admin" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Log de Auditoria Inviolável</h1>
        <p className="text-sm text-slate-400">
          Histórico imutável de criações, alterações, arquivamentos e restaurações (RF18, RF18a, RN04).
        </p>
      </div>

      <div className="flex-1">
        <EmptyState
          icone={<FileText className="w-12 h-12" />}
          titulo="Nenhum log de auditoria"
          descricao="Não foram encontrados registros para o período selecionado."
        />
      </div>
    </div>
  );
}
