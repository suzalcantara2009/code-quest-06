-- ========================================================
-- CodeQuest - Schema DDL PostgreSQL
-- Baseado na Seção 6 do spec.md
-- ========================================================

-- Tabela de Usuários / Autenticação (RF01a, RF01b, RF01c, RF01f, RN07, RN12)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255),              -- NULL permitido: conta pode ser só OAuth (RF01b)
    github_oauth_id VARCHAR(50) UNIQUE,   -- preenchido no login OAuth (RF01b)
    tipo VARCHAR(20) DEFAULT 'estudante' CHECK (tipo IN ('estudante', 'professor', 'moderador', 'admin')),
    tentativas_login INT DEFAULT 0,
    bloqueado_ate TIMESTAMP,              -- suporta o RF01a (bloqueio após 5 falhas)
    email_verificado BOOLEAN DEFAULT FALSE,  -- suporta RF01c / RN12
    termos_aceitos_em TIMESTAMP,             -- suporta RF01f
    termos_versao VARCHAR(20),               -- suporta RF01f
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_metodo_login CHECK (senha_hash IS NOT NULL OR github_oauth_id IS NOT NULL)
);

-- Tokens de recuperação de senha (RF01a)
CREATE TABLE IF NOT EXISTS tokens_reset_senha (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expira_em TIMESTAMP NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessões / refresh tokens ativos (RF01e — logout de todas as sessões; RNF06)
CREATE TABLE IF NOT EXISTS sessoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expira_em TIMESTAMP NOT NULL,
    revogado BOOLEAN DEFAULT FALSE
);

-- Cache persistido das métricas públicas do GitHub (RF12) — relacional por design
CREATE TABLE IF NOT EXISTS github_cache (
    usuario_github VARCHAR(39) PRIMARY KEY,
    avatar_url TEXT,
    repos_publicos INT DEFAULT 0,
    linguagens JSONB,
    total_estrelas INT DEFAULT 0,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fichas de Personagem (RF02 - RF06, RN01, RN02, RN08, RN09)
CREATE TABLE IF NOT EXISTS fichas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    universo VARCHAR(30) NOT NULL CHECK (universo IN ('Marvel', 'DC', 'Star Wars', 'Tolkien', 'D&D', 'Anime', 'Games')),
    classe VARCHAR(50) NOT NULL,
    poder INT NOT NULL CHECK (poder BETWEEN 0 AND 100),
    data_nascimento DATE,
    email VARCHAR(150),
    usuario_github VARCHAR(39),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Impõe "1 ficha ativa por usuário" no nível do banco (RN06)
CREATE UNIQUE INDEX IF NOT EXISTS idx_ficha_ativa_unica_por_usuario
ON fichas (usuario_id)
WHERE ativo = TRUE;

-- Impõe a RN09: um usuario_github não pode estar vinculado a mais de uma ficha ativa ao mesmo tempo
CREATE UNIQUE INDEX IF NOT EXISTS idx_github_unico_em_ficha_ativa
ON fichas (usuario_github)
WHERE ativo = TRUE AND usuario_github IS NOT NULL;

-- Índices de performance para busca/filtro (RF08) e listagem (RF07)
CREATE INDEX IF NOT EXISTS idx_fichas_busca_ativa ON fichas (ativo, universo, nome);

-- Índice de performance para o ranking público (RF17)
CREATE INDEX IF NOT EXISTS idx_fichas_ranking ON fichas (ativo, poder DESC);

-- Tabela de Módulos da Trilha Pedagógica (RF13)
CREATE TABLE IF NOT EXISTS modulos (
    id SERIAL PRIMARY KEY,
    ordem INT UNIQUE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    tecnologia VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL
);

-- Tabela de Missões / Exercícios (RF14, RF14a)
CREATE TABLE IF NOT EXISTS missoes (
    id SERIAL PRIMARY KEY,
    modulo_id INT REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    codigo_inicial TEXT,
    criterio_aceite TEXT NOT NULL,
    dificuldade VARCHAR(10) DEFAULT 'facil' CHECK (dificuldade IN ('facil', 'medio', 'dificil')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Missões Concluídas (RF15, RF15b)
CREATE TABLE IF NOT EXISTS missoes_concluidas (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE CASCADE,
    missao_id INT REFERENCES missoes(id) ON DELETE CASCADE,
    data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ficha_id, missao_id)
);

-- Denúncias de fichas (RF19, RF19a, RF19b, RN10)
CREATE TABLE IF NOT EXISTS denuncias (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE CASCADE,
    denunciante_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    moderador_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    motivo TEXT NOT NULL,
    status VARCHAR(15) DEFAULT 'pendente' CHECK (status IN ('pendente', 'procedente', 'improcedente')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolvido_em TIMESTAMP
);

-- Salas de aula virtuais (RF20)
CREATE TABLE IF NOT EXISTS salas (
    id SERIAL PRIMARY KEY,
    professor_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    codigo_acesso VARCHAR(20) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matrícula de alunos em salas (RF20a, RF20b)
CREATE TABLE IF NOT EXISTS sala_alunos (
    id SERIAL PRIMARY KEY,
    sala_id INT REFERENCES salas(id) ON DELETE CASCADE,
    aluno_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    entrou_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sala_id, aluno_id)
);

-- Tabela de Auditoria Inviolável (RF18, RF18a, RN04)
CREATE TABLE IF NOT EXISTS auditoria (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE SET NULL,
    autor_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    acao VARCHAR(50) NOT NULL,
    detalhes TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
