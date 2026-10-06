'use client';

import React, { useState } from 'react';
import { School, Plus, Key } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function SalasPage() {
  const [modalCriarSala, setModalCriarSala] = useState(false);
  const [modalEntrarSala, setModalEntrarSala] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Salas de Aula Virtuais</h1>
          <p className="text-sm text-slate-400">
            Acompanhe o progresso de turmas ou participe de uma sala criada por seu professor.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setModalEntrarSala(true)}>
            <Key className="w-4 h-4" />
            Entrar com Código
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setModalCriarSala(true)}>
            <Plus className="w-4 h-4" />
            Nova Sala
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <EmptyState
          icone={<School className="w-12 h-12" />}
          titulo="Nenhuma sala cadastrada"
          descricao="Você ainda não participa de nenhuma sala de aula virtual."
        />
      </div>

      {/* Modal Criar Sala */}
      <Modal
        isOpen={modalCriarSala}
        onClose={() => setModalCriarSala(false)}
        title="Criar Sala de Aula"
        description="Gere uma nova sala para acompanhar o progresso de seus estudantes."
        confirmText="Criar Sala"
        onConfirm={() => setModalCriarSala(false)}
      >
        <Input label="Nome da Turma / Sala" placeholder="Ex: Turma Web 2026.1" required />
      </Modal>

      {/* Modal Entrar na Sala */}
      <Modal
        isOpen={modalEntrarSala}
        onClose={() => setModalEntrarSala(false)}
        title="Entrar em uma Sala"
        description="Digite o código de acesso fornecido pelo seu professor."
        confirmText="Entrar"
        onConfirm={() => setModalEntrarSala(false)}
      >
        <Input label="Código de Acesso" placeholder="Ex: ABC123XYZ" required />
      </Modal>
    </div>
  );
}
