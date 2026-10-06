import { z } from 'zod';

export const missaoSchema = z.object({
  modulo_id: z.coerce.number().int().positive('Módulo inválido'),
  titulo: z.string().trim().min(3, 'Título muito curto').max(150, 'Título muito longo'),
  enunciado: z.string().trim().min(10, 'Enunciado deve ter no mínimo 10 caracteres'),
  codigo_inicial: z.string().optional(),
  criterio_aceite: z.string().trim().min(5, 'Critério de aceite obrigatório'),
  dificuldade: z.enum(['facil', 'medio', 'dificil'], {
    errorMap: () => ({ message: 'Dificuldade deve ser facil, medio ou dificil' }),
  }),
});

export type MissaoInput = z.infer<typeof missaoSchema>;
