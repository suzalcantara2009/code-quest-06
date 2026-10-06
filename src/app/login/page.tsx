'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { loginSchema } from '@/lib/validations/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [toastSucesso, setToastSucesso] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros({});
    setErroGeral(null);

    // Validação usando Zod (RI01, RI07, RNF02)
    const validacao = loginSchema.safeParse({ email, senha });
    if (!validacao.success) {
      const errosFormatados: Record<string, string> = {};
      validacao.error.errors.forEach((err) => {
        if (err.path[0]) {
          errosFormatados[err.path[0] as string] = err.message;
        }
      });
      setErros(errosFormatados);
      return;
    }

    setCarregando(true);

    try {
      // Simulação da chamada à API de autenticação (RF01a)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok || !data.sucesso) {
        if (data.erros) {
          const fieldErrors: Record<string, string> = {};
          Object.keys(data.erros).forEach((key) => {
            fieldErrors[key] = Array.isArray(data.erros[key]) ? data.erros[key][0] : data.erros[key];
          });
          setErros(fieldErrors);
        } else {
          setErroGeral(data.mensagem || 'E-mail ou senha incorretos.');
        }
        return;
      }

      setToastSucesso('Login efetuado com sucesso! Redirecionando para sua jornada...');
      setTimeout(() => {
        router.push('/fichas');
      }, 1200);
    } catch (err) {
      setErroGeral('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 relative py-12">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Toast de Sucesso (RI09) */}
      {toastSucesso && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <Toast tipo="success" mensagem={toastSucesso} aoFechar={() => setToastSucesso(null)} />
        </div>
      )}

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 mb-3 shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Retorne à Campanha</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Entre na sua conta para acessar sua ficha e progredir na trilha
          </p>
        </div>

        <Card className="border-quest-border bg-slate-900/90 backdrop-blur shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Entrar com Credenciais</CardTitle>
            <CardDescription>
              Informe seu e-mail e senha de aventureiro
            </CardDescription>
          </CardHeader>

          <CardContent>
            {erroGeral && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{erroGeral}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <Input
                label="Endereço de E-mail"
                type="email"
                placeholder="gandalf@codequest.dev"
                required
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                error={erros.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (erros.email) setErros((prev) => ({ ...prev, email: '' }));
                }}
              />

              <div>
                <Input
                  label="Senha Secreta"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="hover:text-white transition focus:outline-none"
                      aria-label={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  value={senha}
                  error={erros.senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    if (erros.senha) setErros((prev) => ({ ...prev, senha: '' }));
                  }}
                />
                <div className="flex justify-end mt-1.5">
                  <Link
                    href="/esqueci-senha"
                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-2.5 shadow-md shadow-indigo-600/20"
                isLoading={carregando}
              >
                {!carregando && (
                  <>
                    <span>Entrar no Reino</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>

            {/* DIVISOR DE MÉTODOS DE LOGIN */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-3 text-slate-500 font-medium">
                  Ou continue com
                </span>
              </div>
            </div>

            {/* BOTÃO LOGIN SOCIAL GITHUB (RF01b) */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-200 gap-2 text-xs sm:text-sm py-2.5"
              onClick={() => {
                setErroGeral('Login com OAuth do GitHub estará disponível na V2 do sistema.');
              }}
            >
              <Github className="w-4 h-4" />
              <span>Entrar com conta do GitHub</span>
            </Button>
          </CardContent>

          <CardFooter className="justify-center border-t border-slate-800 text-xs sm:text-sm text-slate-400 pt-4">
            Ainda não possui personagem?{' '}
            <Link
              href="/cadastro"
              className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline ml-1"
            >
              Criar conta agora
            </Link>
          </CardFooter>
        </Card>

        {/* Lembrete de Segurança / RNF */}
        <p className="text-center text-[11px] text-slate-500 mt-6 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          Conexão protegida com criptografia estrita e cookies seguros (RF01a).
        </p>
      </div>
    </div>
  );
}
