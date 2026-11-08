'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, User, Compass, Trophy, LogIn, Target, LogOut, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface UsuarioSessao {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

export function Navbar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);
  const [carregando, setCarregando] = useState(true);

  const checarSessao = () => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.autenticado && data.usuario) {
          setUsuario(data.usuario);
        } else {
          setUsuario(null);
        }
      })
      .catch(() => setUsuario(null))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    checarSessao();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUsuario(null);
      router.push('/login');
      router.refresh();
    } catch (e) {}
  };

  return (
    <header className="border-b border-quest-border bg-quest-surface/80 backdrop-blur sticky top-0 z-40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-400 hover:text-indigo-300">
          <Shield className="w-6 h-6" />
          <span>CodeQuest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/fichas" className="hover:text-white transition flex items-center gap-1.5">
            <User className="w-4 h-4" />
            Personagens
          </Link>
          <Link href="/missoes" className="hover:text-white transition flex items-center gap-1.5 text-indigo-400 font-medium">
            <Target className="w-4 h-4" />
            Missões
          </Link>
          <Link href="/trilha" className="hover:text-white transition flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            Trilha de Aprendizagem
          </Link>
          <Link href="/ranking" className="hover:text-white transition flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            Ranking
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!carregando && usuario ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-quest-border">
                <span className="text-sm">🧙‍♂️</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                    {usuario.nome}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold leading-tight">
                    Online no BD
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-900/60 text-rose-400 hover:bg-rose-950/40 transition flex items-center gap-1.5"
                title="Encerrar Sessão"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-lg text-sm border border-slate-600 hover:bg-slate-800 text-slate-200 transition flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="px-3.5 py-1.5 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
              >
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
