import React from 'react';
import Link from 'next/link';
import { Users, Shield, Target, FileText, AlertOctagon, UserX } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Painel Administrativo</h1>
          <p className="text-sm text-slate-400">
            Métricas agregadas do sistema e gestão da plataforma (RF22).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/admin/auditoria">
            <Button variant="outline" size="sm" className="gap-1.5">
              <FileText className="w-4 h-4" />
              Auditoria
            </Button>
          </Link>
          <Link href="/admin/denuncias">
            <Button variant="outline" size="sm" className="gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              Moderação
            </Button>
          </Link>
          <Link href="/admin/usuarios">
            <Button variant="outline" size="sm" className="gap-1.5">
              <UserX className="w-4 h-4" />
              Usuários
            </Button>
          </Link>
        </div>
      </div>

      {/* Cards de Métricas Agregadas (RF22) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Usuários Cadastrados</CardTitle>
            <Users className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-slate-500 mt-1">Total de contas no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Fichas Ativas</CardTitle>
            <Shield className="w-4 h-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-slate-500 mt-1">Personagens ativos em combate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Missões Concluídas</CardTitle>
            <Target className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-slate-500 mt-1">Desafios resolvidos na trilha</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
