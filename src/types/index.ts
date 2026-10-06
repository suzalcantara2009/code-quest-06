// ========================================================
// CodeQuest - Definições de Tipos TypeScript
// ========================================================

export const UNIVERSOS_VALIDOS = [
  'Marvel',
  'DC',
  'Star Wars',
  'Tolkien',
  'D&D',
  'Anime',
  'Games',
] as const;

export type Universo = (typeof UNIVERSOS_VALIDOS)[number];

export type TipoUsuario = 'estudante' | 'professor' | 'moderador' | 'admin';

export type DificuldadeMissao = 'facil' | 'medio' | 'dificil';

export type StatusDenuncia = 'pendente' | 'procedente' | 'improcedente';

export type TipoAcaoAuditoria =
  | 'CRIACAO'
  | 'EDICAO'
  | 'ARQUIVAMENTO'
  | 'RESTAURACAO'
  | 'MODERACAO_ARQUIVAMENTO'
  | 'DENUNCIA_CRIADA'
  | 'DENUNCIA_RESOLVIDA'
  | 'TENTATIVA_RESET_BLOQUEADA';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha_hash?: string | null;
  github_oauth_id?: string | null;
  tipo: TipoUsuario;
  tentativas_login: number;
  bloqueado_ate?: Date | null;
  email_verificado: boolean;
  termos_aceitos_em?: Date | null;
  termos_versao?: string | null;
  criado_em: Date;
}

export interface Ficha {
  id: number;
  usuario_id: number;
  nome: string;
  universo: Universo;
  classe: string;
  poder: number;
  data_nascimento?: Date | null;
  email?: string | null;
  usuario_github?: string | null;
  ativo: boolean;
  criado_em: Date;
  atualizado_em: Date;
}

export interface GithubCacheData {
  usuario_github: string;
  avatar_url?: string | null;
  repos_publicos: number;
  linguagens?: Record<string, number> | null;
  total_estrelas: number;
  atualizado_em: Date;
}

export interface ModuloTrilha {
  id: number;
  ordem: number;
  titulo: string;
  tecnologia: string;
  descricao: string;
}

export interface Missao {
  id: number;
  modulo_id: number;
  titulo: string;
  enunciado: string;
  codigo_inicial?: string | null;
  criterio_aceite: string;
  dificuldade: DificuldadeMissao;
  criado_em: Date;
}

export interface MissaoConcluida {
  id: number;
  ficha_id: number;
  missao_id: number;
  data_conclusao: Date;
}

export interface Denuncia {
  id: number;
  ficha_id: number;
  denunciante_id?: number | null;
  moderador_id?: number | null;
  motivo: string;
  status: StatusDenuncia;
  criado_em: Date;
  resolvido_em?: Date | null;
}

export interface Sala {
  id: number;
  professor_id: number;
  nome: string;
  codigo_acesso: string;
  criado_em: Date;
}

export interface Auditoria {
  id: number;
  ficha_id?: number | null;
  autor_id?: number | null;
  acao: string;
  detalhes?: string | null;
  data_hora: Date;
}

// Tipos para paginação e busca (RF07, RF08, RI10)
export interface PaginacaoParams {
  pagina?: number;
  limite?: number;
  ordenacao?: 'nome' | 'poder' | 'criado_em';
  direcao?: 'asc' | 'desc';
}

export interface FiltrosFicha extends PaginacaoParams {
  busca?: string;
  universo?: Universo;
}

export interface RespostaPaginada<T> {
  itens: T[];
  pagina_atual: number;
  total_paginas: number;
  total_itens: number;
  limite: number;
}

// Resposta padrão da API
export interface ApiResponse<T = unknown> {
  sucesso: boolean;
  mensagem?: string;
  dados?: T;
  erros?: Record<string, string>;
}
