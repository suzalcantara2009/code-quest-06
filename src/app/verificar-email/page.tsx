import React from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function VerificarEmailPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center text-indigo-400 mb-2">
            <MailCheck className="w-6 h-6" />
          </div>
          <CardTitle>Verificação de E-mail</CardTitle>
          <CardDescription>
            Enviamos um link de confirmação para o seu endereço de e-mail.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-slate-300">
            Conforme a regra do sistema (RN12), contas com e-mail não verificado têm restrição para criar ou editar fichas.
            Verifique sua caixa de entrada e clique no link recebido.
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <Link href="/login">
            <Button variant="outline">Ir para o Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
