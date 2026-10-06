'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { cadastroSchema } from '@/lib/validations/auth';

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [toastSucesso, setToastSucesso] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros({});
    setErroGeral(null);

    // Validação de confirmação de senha
    if (senha !== confirmarSenha) {
      setErros((prev) => ({
        ...prev,
        confirmarSenha: 'As senhas informadas não coincidem',
      }));
      return;
    }

    // Validação com Zod (RF01f, RNF02, RI01, RI07)
    const validacao = cadastroSchema.safeParse({
      nome,
      email,
      senha,
      termos_aceitos: termosAceitos,
    });

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
      // Chamada à API de cadastro (RF01a, RF01c)
      const res = await fetch('/api/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          termos_aceitos: termosAceitos,
        }),
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
          setErroGeral(data.mensagem || 'Falha ao realizar cadastro.');
        }
        return;
      }

      setToastSucesso('Cadastro realizado! Enviamos o link de ativação para seu e-mail.');
      setTimeout(() => {
        // Redireciona para aviso de verificação de e-mail (RF01c, RN12)
        router.push('/verificar-email');
      }, 1500);
    } catch (err) {
      setErroGeral('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 relative py-12">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Toast de Sucesso (RI09) */}
      {toastSucesso && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top duration-300">
          <Toast tipo="success" mensagem={toastSucesso} aoFechar={() => setToastSucesso(null)} />
        </div>
      )}

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 mb-3 shadow-lg">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Crie sua Conta de Aventureiro</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dê o primeiro passo para criar sua ficha de personagem no CodeQuest
          </p>
        </div>

        <Card className="border-quest-border bg-slate-900/90 backdrop-blur shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Novo Cadastro</CardTitle>
            <CardDescription>
              Preencha os dados abaixo. Um link de verificação será enviado ao seu e-mail.
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
                label="Nome Completo"
                placeholder="Ex: Legolas Folha Verde"
                required
                leftIcon={<User className="w-4 h-4" />}
                value={nome}
                error={erros.nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (erros.nome) setErros((prev) => ({ ...prev, nome: '' }));
                }}
                helperText="Seu nome real de aventureiro (2 a 100 caracteres)"
              />

              <Input
                label="Endereço de E-mail"
                type="email"
                placeholder="legolas@floresta.dev"
                required
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                error={erros.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (erros.email) setErros((prev) => ({ ...prev, email: '' }));
                }}
                helperText="Será utilizado para verificação e recuperação de acesso"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  helperText="Mínimo de 8 caracteres"
                />

                <Input
                  label="Confirmar Senha"
                  type={mostrarConfirmarSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                      className="hover:text-white transition focus:outline-none"
                      aria-label={mostrarConfirmarSenha ? 'Ocultar confirmação' : 'Exibir confirmação'}
                    >
                      {mostrarConfirmarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  value={confirmarSenha}
                  error={erros.confirmarSenha}
                  onChange={(e) => {
                    setConfirmarSenha(e.target.value);
                    if (erros.confirmarSenha) setErros((prev) => ({ ...prev, confirmarSenha: '' }));
                  }}
                  helperText="Digite a mesma senha"
                />
              </div>

              {/* ACEITE OBRIGATÓRIO DE TERMOS E LGPD (RF01f) */}
              <div className="pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <input
                    id="termos_aceitos"
                    type="checkbox"
                    checked={termosAceitos}
                    onChange={(e) => {
                      setTermosAceitos(e.target.checked);
                      if (erros.termos_aceitos) {
                        setErros((prev) => ({ ...prev, termos_aceitos: '' }));
                      }
                    }}
                    className="mt-0.5 h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    required
                  />
                  <div className="flex-1 text-xs text-slate-300 leading-snug">
                    <label htmlFor="termos_aceitos" className="cursor-pointer select-none">
                      Li e concordo expressamente com os{' '}
                      <Link
                        href="/termos"
                        target="_blank"
                        className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline"
                      >
                        Termos de Uso
                      </Link>{' '}
                      e a{' '}
                      <Link
                        href="/termos"
                        target="_blank"
                        className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline"
                      >
                        Política de Privacidade (LGPD v1.0)
                      </Link>
                      . <span className="text-red-400">*</span>
                    </label>
                  </div>
                </div>
                {erros.termos_aceitos && (
                  <span className="text-xs text-red-400 block mt-1.5 ml-1">
                    {erros.termos_aceitos}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-2.5 shadow-md shadow-indigo-600/20 mt-2"
                isLoading={carregando}
              >
                {!carregando && (
                  <>
                    <span>Concluir Cadastro e Iniciar Aventura</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-slate-800 text-xs sm:text-sm text-slate-400 pt-4">
            Já possui uma conta registrada?{' '}
            <Link
              href="/login"
              className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline ml-1"
            >
              Fazer login
            </Link>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Conformidade LGPD
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            Verificação por E-mail (RN12)
          </span>
        </div>
      </div>
    </div>
  );
}
