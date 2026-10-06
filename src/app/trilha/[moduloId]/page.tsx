import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ModuloDetalhesPage({ params }: { params: { moduloId: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
      <div className="mb-6">
        <Link href="/trilha" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar para a trilha
        </Link>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="purple">Módulo {params.moduloId}</Badge>
            </div>
            <CardTitle className="text-2xl mt-2">Conteúdo do Módulo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300 text-sm">
            <p>
              Explore os conceitos teóricos e as missões práticas deste módulo para consolidar seu aprendizado.
            </p>

            <div className="pt-4 border-t border-quest-border flex items-center justify-between">
              <span className="text-xs text-slate-400">Progresso do Módulo: 0% concluído</span>
              <Link href="/missoes">
                <Button size="sm">Ver Missões do Módulo</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
