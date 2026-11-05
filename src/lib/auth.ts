import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from './db';

// RNF01 - Hash com bcrypt (custo >= 10)
const BCRYPT_SALT_ROUNDS = 10;
export const SESSION_COOKIE_NAME = 'codequest_session';

export async function hashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, BCRYPT_SALT_ROUNDS);
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash);
}

// Estrutura para gerenciamento de sessão e tokens (RF01a, RF01e)
export interface SessionPayload {
  usuarioId: number;
  email: string;
  nome: string;
  tipo: string;
}

export async function criarSessao(usuarioId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  await prisma.sessao.create({
    data: {
      usuario_id: usuarioId,
      refresh_token_hash: tokenHash,
      expira_em: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias (RF01a)
    },
  });

  return `${usuarioId}:${token}`;
}

export async function obterSessaoAtual(): Promise<SessionPayload | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) return null;

    const [usuarioIdStr, token] = sessionCookie.split(':');
    const usuarioId = parseInt(usuarioIdStr, 10);

    if (isNaN(usuarioId) || !token) return null;

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const sessao = await prisma.sessao.findFirst({
      where: {
        usuario_id: usuarioId,
        refresh_token_hash: tokenHash,
        revogado: false,
        expira_em: {
          gt: new Date(),
        },
      },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nome: true,
            tipo: true,
          },
        },
      },
    });

    if (!sessao || !sessao.usuario) return null;

    return {
      usuarioId: sessao.usuario.id,
      email: sessao.usuario.email,
      nome: sessao.usuario.nome,
      tipo: sessao.usuario.tipo,
    };
  } catch (error) {
    return null;
  }
}

export async function revogarSessao(rawSessionCookie: string): Promise<void> {
  try {
    const [usuarioIdStr, token] = rawSessionCookie.split(':');
    const usuarioId = parseInt(usuarioIdStr, 10);
    if (!isNaN(usuarioId) && token) {
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      await prisma.sessao.updateMany({
        where: {
          usuario_id: usuarioId,
          refresh_token_hash: tokenHash,
        },
        data: {
          revogado: true,
        },
      });
    }
  } catch (error) {
    console.error('Erro ao revogar sessão:', error);
  }
}

export async function revogarTodasSessoes(usuarioId: number): Promise<void> {
  try {
    await prisma.sessao.updateMany({
      where: {
        usuario_id: usuarioId,
      },
      data: {
        revogado: true,
      },
    });
  } catch (error) {
    console.error('Erro ao revogar todas as sessões:', error);
  }
}
