import { GithubCacheData } from '@/types';

// RF12: Timeout de 3s na chamada à API do GitHub
export const GITHUB_API_TIMEOUT_MS = 3000;

export interface GithubUserData {
  login: string;
  avatar_url: string;
  public_repos: number;
}

export async function buscarMetricasGithub(username: string): Promise<GithubCacheData | null> {
  // Estrutura para busca de métricas na API do GitHub com timeout de 3s e cache relacional
  return null;
}

export function validarUsernameGithub(username: string): boolean {
  // RF10: até 39 caracteres, alfanumérico e hífen, sem iniciar/terminar com hífen
  const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return regex.test(username);
}
