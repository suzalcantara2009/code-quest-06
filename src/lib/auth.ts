import bcrypt from 'bcryptjs';

// RNF01 - Hash com bcrypt (custo >= 10)
const BCRYPT_SALT_ROUNDS = 10;

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
  tipo: string;
}

export async function obterSessaoAtual(): Promise<SessionPayload | null> {
  // Boilerplate para obter sessão atual via cookies HttpOnly
  return null;
}

export async function criarSessao(usuarioId: number): Promise<string> {
  // Boilerplate para geração de token de sessão
  return '';
}

export async function revogarSessao(refreshTokenHash: string): Promise<void> {
  // Boilerplate para revogação de sessão na tabela sessoes
}

export async function revogarTodasSessoes(usuarioId: number): Promise<void> {
  // Boilerplate para RF01e - Encerrar todas as sessões
}
