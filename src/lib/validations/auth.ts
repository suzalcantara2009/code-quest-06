import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const cadastroSchema = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres'),
  email: z.string().email('E-mail inválido').max(150, 'E-mail muito longo'),
  senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  termos_aceitos: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os Termos de Uso e Política de Privacidade' }),
  }),
});

export const esqueciSenhaSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export const redefinirSenhaSchema = z.object({
  token: z.string().min(1, 'Token obrigatório'),
  novaSenha: z.string().min(8, 'A nova senha deve ter pelo menos 8 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CadastroInput = z.infer<typeof cadastroSchema>;
export type EsqueciSenhaInput = z.infer<typeof esqueciSenhaSchema>;
export type RedefinirSenhaInput = z.infer<typeof redefinirSenhaSchema>;
