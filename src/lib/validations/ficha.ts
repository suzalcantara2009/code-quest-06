import { z } from 'zod';
import { UNIVERSOS_VALIDOS } from '@/types';

// Regex para username GitHub (RF10)
const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const fichaSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .refine((val) => /[a-zA-Z0-9À-ÿ]/.test(val), {
      message: 'O nome não pode ser composto apenas por espaços ou caracteres especiais',
    }),
  universo: z.enum(UNIVERSOS_VALIDOS, {
    errorMap: () => ({
      message:
        'Universo inválido. Escolha entre: Marvel, DC, Star Wars, Tolkien, D&D, Anime, Games',
    }),
  }),
  classe: z.string().trim().min(2, 'Classe é obrigatória').max(50, 'Classe muito longa'),
  poder: z.coerce
    .number({ invalid_type_error: 'O poder deve ser um número' })
    .int('O poder deve ser um número inteiro')
    .min(0, 'O poder deve estar entre 0 e 100')
    .max(100, 'O poder deve estar entre 0 e 100'),
  data_nascimento: z.string().optional().or(z.literal('')),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  usuario_github: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => !val || GITHUB_USERNAME_REGEX.test(val),
      'Nome de usuário do GitHub inválido'
    ),
});

export type FichaInput = z.infer<typeof fichaSchema>;
