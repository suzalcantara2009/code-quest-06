'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RedefinirSenhaPage() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Redefinir Senha</CardTitle>
          <CardDescription>
            Digite sua nova senha para recuperar o acesso à sua conta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Nova Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />

            <Input
              label="Confirmar Nova Senha"
              type="password"
              placeholder="Repita a nova senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <Button type="submit" className="w-full">
              Salvar Nova Senha
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-slate-400">
          <Link href="/login" className="text-indigo-400 hover:underline">
            Voltar ao login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
