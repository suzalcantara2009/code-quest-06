'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function EditarFichaPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Editar Ficha de Personagem</CardTitle>
          <CardDescription>
            Atualize as informações cadastrais do seu personagem.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="Nome do Personagem" defaultValue="Nome Atual" required />
            <Input label="Classe" defaultValue="Classe Atual" required />
            <Input label="E-mail de Exibição Pública" type="email" placeholder="contato@exemplo.com" />
            <Input label="Usuário do GitHub" placeholder="seu-usuario" />

            <div className="pt-4 flex justify-end gap-3">
              <Link href={`/fichas/${params.id}`}>
                <Button variant="ghost">Cancelar</Button>
              </Link>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
