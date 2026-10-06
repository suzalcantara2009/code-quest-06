import React from 'react';
import Link from 'next/link';
import { ArrowLeft, UserX } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AdminUsuariosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="mb-6">
        <Link href="/admin" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Gerenciamento de Usuários</h1>
        <p className="text-sm text-slate-400">
          Suspensão e reativação de contas de usuário pelo administrador (RF23).
        </p>
      </div>

      <div className="flex-1">
        <EmptyState
          icone={<UserX className="w-12 h-12" />}
          titulo="Nenhum usuário suspenso"
          descricao="Todas as contas cadastradas estão ativas."
        />
      </div>
    </div>
  );
}
