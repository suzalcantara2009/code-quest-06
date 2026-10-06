'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperar Senha</CardTitle>
          <CardDescription>
            Informe seu e-mail cadastrado para receber as instruções de recuperação.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {enviado ? (
            <div className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-lg text-sm text-indigo-300">
              Se o e-mail existir, um link de recuperação de uso único válido por 1 hora será enviado em instantes.
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setEnviado(true);
              }}
            >
              <Input
                label="E-mail Cadastrado"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" className="w-full">
                Enviar Link de Recuperação
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="justify-center text-sm text-slate-400">
          Lembrou sua senha?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline ml-1">
            Voltar ao login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
