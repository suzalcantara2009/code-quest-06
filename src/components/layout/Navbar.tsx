'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, User, Compass, Trophy, LogIn } from 'lucide-react';

export function Navbar() {
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
        </div>
      </div>
    </header>
  );
}
