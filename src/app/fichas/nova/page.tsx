'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UNIVERSOS_VALIDOS, Universo } from '@/types';

export default function NovaFichaPage() {
  const [nome, setNome] = useState('');
  const [universo, setUniverso] = useState<Universo>('Games');
  const [classe, setClasse] = useState('');
  const [poder, setPoder] = useState('50');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailExibicao, setEmailExibicao] = useState('');
  const [usuarioGithub, setUsuarioGithub] = useState('');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Criar Ficha de Personagem</CardTitle>
          <CardDescription>
            Defina sua identidade no RPG de programação do CodeQuest.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Nome do Personagem"
              placeholder="Ex: Aragorn, Neo, Jinx..."
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              helperText="Entre 2 e 100 caracteres"
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="universo" className="text-sm font-medium text-slate-300">
                Universo <span className="text-red-400">*</span>
              </label>
              <select
                id="universo"
                value={universo}
                onChange={(e) => setUniverso(e.target.value as Universo)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                required
              >
                {UNIVERSOS_VALIDOS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Classe"
              placeholder="Ex: Mago Fullstack, Ranger DevOps, Guerreiro Backend..."
              required
              value={classe}
              onChange={(e) => setClasse(e.target.value)}
            />

            <Input
              label="Poder Inicial (0 a 100)"
              type="number"
              min={0}
              max={100}
              required
              value={poder}
              onChange={(e) => setPoder(e.target.value)}
            />

            <Input
              label="Data de Nascimento (Opcional)"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />

            <Input
              label="E-mail de Exibição Pública (Opcional)"
              type="email"
              placeholder="contato@exemplo.com"
              value={emailExibicao}
              onChange={(e) => setEmailExibicao(e.target.value)}
            />

            <Input
              label="Usuário do GitHub (Opcional)"
              placeholder="Ex: torvalds"
              value={usuarioGithub}
              onChange={(e) => setUsuarioGithub(e.target.value)}
              helperText="Até 39 caracteres, alfanumérico e hífen"
            />

            <div className="pt-4 flex justify-end gap-3">
              <Link href="/fichas">
                <Button variant="ghost">Cancelar</Button>
              </Link>
              <Button type="submit">Salvar Ficha</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
