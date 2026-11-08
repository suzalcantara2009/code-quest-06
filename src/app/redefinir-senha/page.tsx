'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { Lock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

function RedefinirSenhaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailParam);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!email) {
      setErro('Informe o seu endereço de e-mail.');
      return;
    }

    if (novaSenha.length < 8) {
      setErro('A nova senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas informadas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch('/api/auth/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, novaSenha }),
      });

      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        setErro(data.mensagem || 'Falha ao redefinir senha.');
        return;
      }

      setMensagemSucesso('Senha atualizada com sucesso no banco de dados!');
      setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (e) {
      setErro('Erro de conexão ao redefinir a senha.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      {mensagemSucesso && (
        <div className="fixed top-6 right-6 z-50">
          <Toast tipo="success" mensagem={mensagemSucesso} aoFechar={() => setMensagemSucesso(null)} />
        </div>
      )}

      <Card className="w-full max-w-md border-quest-border bg-slate-900/90 shadow-2xl">
        <CardHeader>
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl text-white">Redefinir Senha de Acesso</CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            Digite seu e-mail cadastrado e escolha uma nova senha para recuperar seu acesso.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {erro && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{erro}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="E-mail Cadastrado"
              type="email"
              placeholder="seu-email@exemplo.com"
              required
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Nova Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
              leftIcon={<Lock className="w-4 h-4" />}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />

            <Input
              label="Confirmar Nova Senha"
              type="password"
              placeholder="Repita a nova senha"
              required
              leftIcon={<Lock className="w-4 h-4" />}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <Button type="submit" isLoading={carregando} className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold">
              Salvar Nova Senha no Banco
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-xs text-slate-400">
          <Link href="/login" className="text-indigo-400 hover:underline">
            Lembrou da senha? Voltar ao login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <React.Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-400">Carregando...</div>}>
      <RedefinirSenhaForm />
    </React.Suspense>
  );
}
