import { z } from 'zod';

export const salaSchema = z.object({
  nome: z.string().trim().min(3, 'Nome da sala deve ter no mínimo 3 caracteres').max(100),
});

export const entrarSalaSchema = z.object({
  codigo_acesso: z.string().trim().min(4, 'Código de acesso inválido').max(20),
});

export type SalaInput = z.infer<typeof salaSchema>;
export type EntrarSalaInput = z.infer<typeof entrarSalaSchema>;
