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

-- ========================================================
-- Dados Iniciais (Seeds Obrigatórios para Inicialização)
-- ========================================================

-- Usuário fictício de teste (Senha: SenhaForte123!)
INSERT INTO usuarios (id, nome, email, senha_hash, tipo, email_verificado, termos_aceitos_em, termos_versao)
VALUES (
    1,
    'Aventureiro de Teste',
    'aluno@codequest.dev',
    '$2a$10$iWHF/0AWGjiIe4rtgjDATOTfNYT2XKTUxBL7CfYirCHr9N.86cnB2',
    'estudante',
    TRUE,
    CURRENT_TIMESTAMP,
    '1.0'
) ON CONFLICT (email) DO NOTHING;

-- Módulos da Trilha Pedagógica
INSERT INTO modulos (id, ordem, titulo, tecnologia, descricao) VALUES
(1, 1, 'Módulo 1 — Programação em Blocos', 'Blocos / Lógica', 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços de repetição visuais.'),
(2, 2, 'Módulo 2 — Python', 'Python', 'Sintaxe limpa, estruturas de dados, funções, loops e modelagem orientada a objetos com scripts eficientes.'),
(3, 3, 'Módulo 3 — HTML e CSS', 'HTML/CSS', 'Estruturação semântica, acessibilidade web, responsividade, Flexbox, Grid e animações visuais.'),
(4, 4, 'Módulo 4 — JavaScript', 'JavaScript', 'Interatividade no navegador, manipulação de eventos e DOM, arrays modernos e consumo de APIs assíncronas.')
ON CONFLICT (id) DO NOTHING;

-- Missões do Módulo 1: Blocos
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(1, 1, 'O Despertar do Algoritmo: A Sequência de Passos', 'Para abrir o Portão Ancestral, acenda as 3 tochas na ordem sequencial exata.', 'Avancar(1); AcenderTocha(1); Avancar(2); AcenderTocha(2); Avancar(1); AcenderTocha(3);', 'Executar a sequência sem pular etapas.', 'facil'),
(2, 1, 'O Guardião das Pontes: Decisões com SE / SENÃO', 'Avalie se a ponte está abaixada para atravessar com segurança.', 'SE (ponte_abaixada == VERDADEIRO) ENTAO AtravessarPonte(); SENAO DesviarPeloAtalho(); FIM_SE', 'Tratar caminhos de sucesso e desvio.', 'medio'),
(3, 1, 'O Labirinto dos Cristais: Repetições com ENQUANTO', 'Colete cristais enquanto a energia for inferior a 100.', 'ENQUANTO (energia < 100) FACA ColetarCristal(); energia = energia + 20; FIM_ENQUANTO', 'Condição de parada correta.', 'medio'),
(4, 1, 'A Forja dos Autômatos: Funções e Modularização', 'Crie um bloco modular para forjar autômatos de defesa.', 'FUNCAO MontarGolem(tipo_runa, armadura) RETORNAR "Golem Criado"; FIM_FUNCAO', 'Encapsulamento com parâmetros.', 'dificil')
ON CONFLICT (id) DO NOTHING;

-- Missões do Módulo 2: Python
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(5, 2, 'O Grimório das Variáveis: Cálculo de Dano Crítico', 'Calcule o dano total: (ataque_base * multiplicador) + bonus.', 'def calcular_dano_critico(ataque_base: int, multiplicador: float, bonus_arma: int) -> float:\n    return round((ataque_base * multiplicador) + bonus_arma, 2)', 'Retorno numérico com fórmula correta.', 'facil'),
(6, 2, 'A Sentinela dos Portais: Decisões if / elif / else', 'Verifique o nível do herói para autorizar acesso aos portais.', 'def verificar_acesso_portal(nivel_aventureiro: int, possui_chave: bool) -> str:\n    if nivel_aventureiro >= 20 and possui_chave:\n        return "Acesso Permitido: Santuário dos Mestres"\n    elif nivel_aventureiro >= 10:\n        return "Acesso Permitido: Pátio dos Aprendizes"\n    else:\n        return "Acesso Negado: Nível Insuficiente"', 'Contemplar todas as faixas de nível.', 'medio'),
(7, 2, 'O Inventário Mágico: Listas e Dicionários', 'Busque o poder de um item em um dicionário.', 'def consultar_poder_item(grimorio: dict, nome_item: str) -> int:\n    return grimorio.get(nome_item, 0)', 'Consulta segura de dicionário.', 'medio'),
(8, 2, 'A Forja dos Heróis: Classes e POO em Python', 'Crie a classe PersonagemRPG com método receber_dano.', 'class PersonagemRPG:\n    def __init__(self, nome: str, vida: int = 100):\n        self.nome = nome\n        self.vida = max(0, vida)\n    def receber_dano(self, dano: int) -> int:\n        self.vida = max(0, self.vida - dano)\n        return self.vida', 'Classe com atributos e métodos de combate.', 'dificil')
ON CONFLICT (id) DO NOTHING;

-- Missões do Módulo 3: HTML & CSS
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(9, 3, 'A Forja Semântica: O Pergaminho de Missão', 'Crie a marcação semântica com article, header e p.', '<article class="card-missao">\n  <header><h2>Missão</h2></header>\n  <p>Descrição</p>\n</article>', 'Uso de tags semânticas do HTML5.', 'facil'),
(10, 3, 'O Escudo Flexbox: Grid de Inventário Alinhado', 'Estilize o inventário com CSS Grid e Flexbox.', '.inventario { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }', 'Alinhamento e espaçamento fluido.', 'medio'),
(11, 3, 'A Barra de Mana Animada: Keyframes e Gradientes', 'Crie animação contínua @keyframes na barra de energia.', '@keyframes pulsarMana { 0% { filter: brightness(1); } 100% { filter: brightness(1.3); } }', 'Animação com linear-gradient.', 'medio'),
(12, 3, 'O Tema Escuro do RPG: Custom Properties e Media Queries', 'Adapte o layout entre mobile e desktop.', '@media (min-width: 768px) { .painel { display: grid; grid-template-columns: 200px 1fr; } }', 'Layout responsivo adaptável.', 'dificil')
ON CONFLICT (id) DO NOTHING;

-- Missões do Módulo 4: JavaScript
INSERT INTO missoes (id, modulo_id, titulo, enunciado, codigo_inicial, criterio_aceite, dificuldade) VALUES
(13, 4, 'O Golpe do Dragão: Funções e Multiplicadores', 'Calcule a experiência com bônus por nível.', 'function calcularExperienciaVitoria(nivel, monstros) { return Math.round(monstros * 50 * (1 + nivel * 0.1)); }', 'Cálculo de XP arredondado.', 'facil'),
(14, 4, 'O Feitiço dos Eventos: Manipulação de DOM', 'Atualize o texto e a barra de vida ao clicar no botão.', 'botao.addEventListener("click", () => { hp = Math.min(100, hp + 20); display.textContent = hp + " HP"; });', 'Uso de addEventListener e textContent.', 'medio'),
(15, 4, 'O Códice dos Magos: filter, map e reduce', 'Calcule a média de poder dos magos com métodos funcionais.', 'function mediaPoder(lista) { const magos = lista.filter(h => h.classe === "Mago"); return Math.round(magos.reduce((acc, m) => acc + m.poder, 0) / magos.length); }', 'Uso de filter e reduce combinados.', 'medio'),
(16, 4, 'A Invocação Assíncrona: Consumo de API', 'Implemente função assíncrona com async e await.', 'async function buscarOraculo() { const res = await fetch("/api/oraculo"); return await res.json(); }', 'Tratamento de Promise com async/await.', 'dificil')
ON CONFLICT (id) DO NOTHING;
