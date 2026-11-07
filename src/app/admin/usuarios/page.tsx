'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, ShieldCheck, Mail, Calendar, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';

interface UsuarioDB {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  email_verificado: boolean;
  criado_em: string;
  _count?: {
    fichas: number;
  };
}

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioDB[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarUsuarios = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch('/api/usuarios');
      const data = await res.json();
      if (data.sucesso && data.dados?.usuarios) {
        setUsuarios(data.dados.usuarios);
      } else {
        setErro(data.mensagem || 'Falha ao carregar lista de usuários');
      }
    } catch (err) {
      setErro('Erro de conexão ao consultar usuários no banco de dados');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin" className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={carregarUsuarios}
          className="text-xs text-indigo-400 hover:text-indigo-300 gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${carregando ? 'animate-spin' : ''}`} />
          Atualizar Lista
        </Button>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Usuários Cadastrados</h1>
            <Badge variant="purple">{usuarios.length} Contas no PostgreSQL</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Contas persistidas no banco relacional PostgreSQL (Neon Serverless).
          </p>
        </div>
      </div>

      {carregando ? (
        <div className="flex-1 flex items-center justify-center py-16">
          <LoadingSpinner texto="Consultando contas no banco PostgreSQL..." />
        </div>
      ) : erro ? (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-sm">
          {erro}
        </div>
      ) : usuarios.length === 0 ? (
        <div className="flex-1">
          <EmptyState
            icone={<Users className="w-12 h-12" />}
            titulo="Nenhum usuário cadastrado"
            descricao="Nenhuma conta de aventureiro foi encontrada na tabela de usuários."
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-quest-border bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-quest-border">
                <tr>
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Nome de Aventureiro</th>
                  <th className="px-4 py-3.5">Endereço de E-mail</th>
                  <th className="px-4 py-3.5">Tipo / Perfil</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Data de Cadastro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs text-indigo-400">#{u.id}</td>
                    <td className="px-4 py-3.5 font-medium text-white flex items-center gap-2">
                      <span>{u.nome}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      <div className="inline-flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{u.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={u.tipo === 'admin' ? 'purple' : u.tipo === 'professor' ? 'cyan' : 'default'}>
                        {u.tipo}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ativo
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400">
                      <div className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{new Date(u.criado_em).toLocaleDateString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
