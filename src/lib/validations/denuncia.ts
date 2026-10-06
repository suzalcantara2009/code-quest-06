import { z } from 'zod';

export const denunciaSchema = z.object({
  ficha_id: z.coerce.number().int().positive('Ficha inválida'),
  motivo: z
    .string()
    .trim()
    .min(10, 'Descreva o motivo com pelo menos 10 caracteres')
    .max(1000, 'Motivo muito longo'),
});

export const moderacaoDenunciaSchema = z.object({
  denuncia_id: z.coerce.number().int().positive(),
  status: z.enum(['procedente', 'improcedente'], {
    errorMap: () => ({ message: 'Status deve ser procedente ou improcedente' }),
  }),
  justificativa: z.string().trim().min(5, 'Justificativa obrigatória'),
});

export type DenunciaInput = z.infer<typeof denunciaSchema>;
export type ModeracaoDenunciaInput = z.infer<typeof moderacaoDenunciaSchema>;
