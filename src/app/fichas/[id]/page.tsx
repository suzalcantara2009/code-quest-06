'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Github, RefreshCw, Archive, Edit3, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function FichaDetalhesPage({ params }: { params: { id: string } }) {
  const [modalArquivarAberto, setModalArquivarAberto] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <div className="mb-6">
        <Link href="/fichas" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar para personagens
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Nome do Personagem</CardTitle>
                <p className="text-sm text-slate-400 mt-1">Classe: Desenvolvedor</p>
              </div>
              <Badge variant="purple">Universo: Games</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Poder de Combate</span>
                  <strong className="text-white">75 / 100</strong>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-3 rounded-full w-3/4" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-quest-border">
                <Link href={`/fichas/${params.id}/editar`}>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Edit3 className="w-4 h-4" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setModalArquivarAberto(true)}
                >
                  <Archive className="w-4 h-4" />
                  Arquivar Ficha
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card de Métricas do GitHub (RF11, RF12) */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Github className="w-5 h-5" />
                Métricas do GitHub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Cache persistido (1h)</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Atualizar
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Avatar, repositórios públicos e total de estrelas integrados ao poder da ficha.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Confirmação para Arquivamento (RI02, RF05) */}
      <Modal
        isOpen={modalArquivarAberto}
        onClose={() => setModalArquivarAberto(false)}
        title="Arquivar Ficha de Personagem?"
        description="Esta ação removerá a ficha da listagem pública ativa. Você poderá restaurá-la posteriormente na área de fichas arquivadas."
        confirmText="Confirmar Arquivamento"
        confirmVariant="danger"
        onConfirm={() => {
          setModalArquivarAberto(false);
        }}
      />
    </div>
  );
}
