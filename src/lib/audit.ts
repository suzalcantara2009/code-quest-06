import { prisma } from './db';
import { TipoAcaoAuditoria } from '@/types';

export interface RegistrarAuditoriaParams {
  fichaId?: number | null;
  autorId?: number | null;
  acao: TipoAcaoAuditoria | string;
  detalhes?: string | null;
}

/**
 * RF18 / RN04: Auditoria inviolável de mutações de ficha e ações administrativas.
 * Erros ao gravar auditoria não revertem a operação principal, mas são registrados (RNF09).
 */
export async function registrarAuditoria(params: RegistrarAuditoriaParams): Promise<void> {
  try {
    await prisma.auditoria.create({
      data: {
        ficha_id: params.fichaId ?? null,
        autor_id: params.autorId ?? null,
        acao: params.acao,
        detalhes: params.detalhes ?? null,
      },
    });
  } catch (error) {
    console.error('[AUDITORIA_ERRO] Falha ao registrar log de auditoria:', error);
  }
}
