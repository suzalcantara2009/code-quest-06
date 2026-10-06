import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-quest-border bg-quest-dark text-slate-400 py-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} CodeQuest - Plataforma Gamificada de Aprendizagem e Portfólio.</p>
        <div className="flex items-center gap-6">
          <Link href="/termos" className="hover:text-slate-200 transition">
            Termos de Uso & Privacidade (LGPD)
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
