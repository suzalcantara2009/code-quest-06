import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function MissaoDetalhesPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
      <div className="mb-6">
        <Link href="/missoes" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar para missões
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="cyan">Dificuldade: Fácil</Badge>
            <span className="text-xs text-slate-500">Missão #{params.id}</span>
          </div>
          <CardTitle className="text-2xl">Título da Missão</CardTitle>
          <CardDescription>Enunciado e instruções para resolução do desafio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono text-slate-300">
            <code>{'// Código inicial da missão'}</code>
          </div>

          <div className="p-4 rounded-lg bg-indigo-950/30 border border-indigo-900 text-sm text-indigo-300">
            <strong>Critério de Aceite:</strong>
            <p className="mt-1 text-slate-300">O critério necessário para validar a conclusão da missão.</p>
          </div>

          <div className="flex justify-end pt-4 border-t border-quest-border">
            <Button>Submeter Resolução</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
