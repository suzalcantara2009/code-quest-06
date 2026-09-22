# CodeQuest — Especificação de Requisitos e Arquitetura do Sistema (spec.md — Versão 2.1)

> **Changelog desta revisão (2.0 → 2.1):**
> 1. Resolvida a contradição "RF01 é MVP e V2 ao mesmo tempo" — separado em RF01a (e-mail/senha, MVP, pré-requisito para RF02–06) e RF01b (OAuth GitHub, V2).
> 2. Corrigido o schema: `senha_hash` agora aceita `NULL` para contas OAuth-only, com `CHECK` garantindo ao menos um método de login; adicionada tabela `tokens_reset_senha`.
> 3. Adicionado RN09 (diferença entre soft delete de negócio e exclusão definitiva por solicitação LGPD) e RN10 (toda ficha pertence a um usuário autenticado).
> 4. Adicionada a Seção 2.3 (Roadmap MVP/V2/Futuro por requisito), ausente na v2.0 apesar de citada no relatório consolidado do projeto.
> 5. Adicionados RNF08 (backup/RPO) e RNF09 (observabilidade de erros), e a lista de variáveis de ambiente (Seção 5.1).
> 6. Esclarecido RF02: `email` da ficha é de exibição pública (opcional, distinto do `email` de login em `usuarios`, que é obrigatório e único).

---

## 1. Visão Geral e Fundamentação Teórica / Justificativa de Produto

### 1.1 Problematização e Objetivos
O **CodeQuest** é uma plataforma web gamificada voltada a desenvolvedores júniores, estudantes de TI e entusiastas da programação. Ele transforma a jornada de aprendizagem técnica em uma aventura de RPG (Role-Playing Game), unindo a criação de "fichas de personagem" (perfis com atributos inspirados em universos lúdicos) ao acompanhamento da prática de código em uma trilha de estudos encadeada e à integração com dados reais da API do GitHub.

A plataforma resolve um problema central do ensino de tecnologia: **o alto índice de desmotivação e abandono no aprendizado autônomo**. Ferramentas tradicionais de portfólio (como um perfil estático do GitHub ou um arquivo README) apenas registram passivamente o histórico, sem oferecer estímulo motivacional contínuo. O CodeQuest atua nessa lacuna ao transformar a prática constante e a evolução pedagógica em pontos de "poder" e progresso visível do personagem.

### 1.2 Fundamentação Científica e Pedagógica
A concepção do CodeQuest apoia-se em arcabouços teóricos consolidados da literatura de educação e engenharia de software:

* **Teoria da Autodeterminação (Deci & Ryan, 2000)**: A motivação intrínseca é sustentada pela satisfação de três necessidades psicológicas básicas:
  * *Competência*: Visualização clara do progresso técnico através do atributo "poder" e conclusão de missões.
  * *Autonomia*: Liberdade para escolher o universo temático (Marvel, DC, Star Wars, Tolkien, D&D, Anime, Games) e a classe do personagem.
  * *Pertencimento*: Participação em salas virtuais de professores, turmas e rankings da comunidade.
* **Prática Deliberada (Ericsson, Krampe & Tesch-Römer, 1993)**: O desenvolvimento da expertise técnica depende da constância e da estrutura da prática ao longo do tempo.
* **Transparência e Aprendizagem entre Pares (Dabbish et al., 2012)**: A transparência da atividade pública no GitHub possui valor real para colaboração, servindo de base confiável e verificável para o nível do desenvolvedor.
* **Design Instrucional e "Game Thinking" (Deterding et al., 2011; Werbach & Hunter, 2012; Kapp, 2012; Sheldon, 2012)**: A gamificação eficaz vai além de emblemas superficiais, ancorando-se em uma identidade narrativa sólida e em critérios de conclusão verificáveis para os exercícios.

---

## 2. Atores do Sistema e Matriz de Permissões (RBAC)

### 2.1 Perfis de Atores
1. **Estudante / Desenvolvedor Júnior**: Aluno cadastrado no sistema. Pode criar/editar sua ficha de personagem, vincular sua conta do GitHub, percorrer a trilha de aprendizagem em 4 módulos, submeter exercícios e acompanhar suas métricas de progresso.
2. **Professor / Educador**: Usuário com permissões especiais para criar "Salas de Aula Virtuais", matricular turmas de alunos, acompanhar o progresso de cada estudante nas missões e visualizar relatórios de desempenho.
3. **Administrador / Curador Oficial**: Responsável pela gestão global do sistema, incluindo o cadastro e manutenção das missões oficiais da plataforma, gerenciamento do catálogo de cursos/módulos e controle total de permissões.
4. **Moderador de Conteúdo**: Usuário promovido por administradores com permissões para analisar denúncias de fichas inadequadas (spam, nomes ofensivos) e confirmar/rejeitar arquivamentos.
5. **Visitante / Anônimo**: Usuário não autenticado que pode navegar pela landing page, consultar a listagem pública de personagens ativos, utilizar filtros/buscas e visualizar o ranking público.

### 2.2 Matriz de Controle de Acesso
| Módulo / Funcionalidade | Visitante | Estudante | Professor | Moderador | Administrador |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Navegação & Listagem Paginada** | Read | Read | Read | Read | Read |
| **Busca & Filtros de Universos** | Read | Read | Read | Read | Read |
| **Visualização do Ranking Público** | Read | Read | Read | Read | Read |
| **Cadastro/Edição da Própria Ficha** | — | Create/Update | Create/Update | Create/Update | Create/Update |
| **Arquivamento da Própria Ficha** | — | Soft Delete | Soft Delete | Soft Delete | Soft Delete |
| **Percorrer Trilha (Blocos → JS)** | — | Executar | Executar | Executar | Executar |
| **Criar/Gerenciar Salas Virtuais** | — | — | Full Access | — | Full Access |
| **Análise de Denúncias de Fichas** | — | — | — | Moderate | Full Access |
| **Curadoria de Missões Oficiais** | — | — | — | — | Full Access |
| **Gestão de Permissões de Moderadores** | — | — | — | — | Full Access |

---

## 2.3 Roadmap de Lançamento

| Fase | Escopo | Requisitos incluídos |
| :--- | :--- | :--- |
| **MVP** | Conta própria, CRUD seguro de ficha, listagem/busca, integração de leitura com GitHub, auditoria | RF01a, RF02–RF12, RF18 |
| **V2** | Login social, trilha pedagógica completa com curadoria, moderação, salas de professor, privacidade | RF01b, RF14, RF15, RF19–RF21 |
| **Futuro** | Automação e métricas agregadas | RF16, RF17 |

RF13 (estrutura dos 4 módulos da trilha) é MVP como **conteúdo estático navegável**; a curadoria dinâmica de missões (RF14/RF15) é que fica para V2 — essa distinção evita que a trilha inteira seja bloqueada esperando o painel de curadoria.

---

## 3. Módulos do Sistema e Requisitos Funcionais (RF)

### Módulo A — Autenticação, Controle de Acesso e Sessão
> **Nota de consistência (v2.1):** a versão anterior classificava RF01 como "MVP / V2" ao mesmo tempo, mas RF02–RF06 (CRUD de fichas) já são MVP e exigem um `usuario_id` dono do registro para funcionar (ver `RN10` e a FK `fichas.usuario_id`). Não é possível ter posse de ficha sem uma conta autenticada. A autenticação básica foi promovida integralmente para MVP; apenas o login social (OAuth GitHub) permanece V2.

* **RF01a — Cadastro e Login por E-mail/Senha (MVP)**:
  * Permite o cadastro (e-mail + senha) e login seguro de usuários.
  * A sessão deve ser gerenciada via Cookies HTTP-Only, `SameSite=Strict` e `Secure`, com expiração configurável (ex.: 7 dias) e renovação silenciosa.
  * Bloqueio temporário de tentativas de login após 5 falhas consecutivas para o mesmo e-mail (proteção contra força bruta), com log de auditoria da tentativa.
  * Fluxo de "esqueci minha senha" via token de uso único enviado por e-mail, com expiração de 1 hora.
  * Garantir que apenas o dono da ficha ou administradores possam editar, arquivar ou restaurar dados associados (checagem feita no servidor, nunca só na UI).
* **RF01b — Login Social via OAuth do GitHub (V2)**:
  * Login alternativo via OAuth 2.0 do GitHub, vinculando automaticamente a conta ao `usuario_github` já existente na ficha, quando houver.
  * Contas criadas via OAuth não possuem `senha_hash` obrigatório (ver ajuste no schema, Seção 6) — podem definir uma senha local a qualquer momento em "Configurações de Segurança".

### Módulo B — Gestão da Ficha de Personagem
* **RF02 — Cadastro da Ficha de Personagem (MVP)**:
  * Registra os dados do personagem/desenvolvedor: `nome` (obrigatório), `universo` (obrigatório, ENUM), `classe` (obrigatório), `poder` (obrigatório, inteiro de 0 a 100), `data_nascimento` (opcional), `email` (opcional — e-mail de **exibição pública** na ficha, independente do e-mail de login em `usuarios`, que é obrigatório e usado só para autenticação), `usuario_github` (opcional).
* **RF03 — Lista Fechada de Universos Permissíveis (MVP)**:
  * O campo `universo` só aceita os valores estritamente definidos na regra de negócio: **Marvel, DC, Star Wars, Tolkien, D&D, Anime, Games**.
* **RF04 — Validação Dupla e Retenção de Estado (MVP)**:
  * Todos os campos do formulário devem possuir validações sintáticas no cliente (JavaScript) e validações obrigatórias no servidor (*server-side*).
  * Caso ocorra erro de validação no servidor, o formulário deve ser reexibido preenchido com os valores exatamente digitados pelo usuário (retenção de estado), sinalizando visualmente quais campos falharam.
* **RF05 — Exclusão Lógica / Arquivamento de Ficha (MVP)**:
  * A ação de "deletar" um personagem atualiza o indicador `ativo = 0` (soft delete), preservando o registro no banco de dados para fins de auditoria e histórico.
  * Requer uma modal de confirmação explícita antes da execução. Fichas arquivadas deixam de ser listadas na visualização pública padrão.
* **RF06 — Restauração de Ficha Arquivada (MVP)**:
  * Permite que o dono da ficha ou um administrador restaure uma ficha inativa, alterando `ativo = 1` e fazendo-a reaparecer imediatamente na listagem de personagens ativos.

### Módulo C — Navegação, Listagem, Paginação e Busca
* **RF07 — Listagem Paginada de Personagens Ativos (MVP)**:
  * Exibe os personagens ativos em formato de tabela/grid ordenados alfabeticamente por nome.
  * Paginação configurável (padrão: 10 registros por página), informando o total de registros encontrados e mantendo os parâmetros de busca ao trocar de página.
* **RF08 — Busca Parcial e Filtro por Universo (MVP)**:
  * Permite a busca parcial de texto por `nome` ou `classe`, com opção de combinar simultaneamente um filtro exato pelo `universo`.
  * Caso nenhum registro seja retornado, exibe uma mensagem amigável de estado vazio (*empty state*).
* **RF09 — Visão de Personagens Arquivados (MVP)**:
  * Área restrita/dedicada que lista separadamente apenas os personagens inativos (`ativo = 0`), disponibilizando o botão de restauração para os usuários autorizados.

### Módulo D — Integração com a API do GitHub
* **RF10 — Validação do Nome de Usuário do GitHub (MVP)**:
  * O campo `usuario_github` deve respeitar o padrão de usernames do GitHub: até 39 caracteres alfanuméricos ou hífens (não podendo iniciar/terminar com hífen).
* **RF11 — Exibição de Métricas Públicas do GitHub (MVP)**:
  * O sistema consulta a API pública do GitHub para extrair: avatar oficial, contagem de repositórios públicos, linguagens de programação mais utilizadas e total de estrelas recebidas.
  * Exibe um link direto para o perfil do desenvolvedor no GitHub.
* **RF12 — Resiliência, Timeout e Tratamento de Limite de Requisições (MVP)**:
  * A chamada à API externa deve possuir um *timeout* máximo de 3 segundos para evitar travamentos na renderização da página.
  * Estratégia de *cache* temporário de dados (ex.: 1 hora, em tabela própria ou storage do provedor) para contornar o limite de 60 requisições/hora por IP da API do GitHub sem autenticação. Caso `GITHUB_API_TOKEN` esteja configurado (Seção 5.1), o limite sobe para 5.000 req/h.
  * Em caso de indisponibilidade ou usuário não encontrado, exibe mensagem clara sem interromper as demais funções da ficha.

### Módulo E — Trilha de Aprendizagem Pedagógica e Quests (Missões)
* **RF13 — Estruturação do Currículo em 4 Módulos Encadeados**:
  * **Módulo 1 — Introdução com Programação em Blocos**: Foco no raciocínio lógico, algoritmos visuais, variáveis e condicionais através de componentes estilo Blockly/Scratch.
  * **Módulo 2 — Transição para Código com Python**: Introdução à sintaxe textual, PEP 8, controle de fluxo (`if/else`), laços de repetição (`for/while`) e criação de funções.
  * **Módulo 3 — Desenvolvimento Web (HTML & CSS)**: Construção da estrutura semântica de páginas web, estilização visual, Flexbox, CSS Grid e princípios de responsividade.
  * **Módulo 4 — Programação Web Dinâmica (JavaScript)**: Lógica de programação no navegador, manipulação do DOM, tratamento de eventos e requisições assíncronas com `fetch`.
* **RF14 — Curadoria e Cadastro de Missões (V2)**:
  * Permite que Administradores/Professores cadastrem missões práticas vinculadas a cada módulo, contendo: título, enunciado, código inicial e critérios de aceite.
* **RF15 — Registro de Conclusão e Progresso Único (V2)**:
  * Cada missão só pode ser concluída e pontuada uma única vez por ficha de personagem.
  * A validação da conclusão pode ser feita por checagem automática (execução de testes em JS/Python na tela ou verificação de commits via Webhook do GitHub) ou por aprovação manual do professor.

### Módulo F — Gamificação, Algoritmo de Poder e Ranking
* **RF16 — Algoritmo Neutro de Cálculo de Poder (Futuro)**:
  * Sugere um valor dinâmico de `poder` (0-100) combinando a quantidade de missões pedagógicas concluídas na trilha com o nível de atividade real extraído do GitHub.
  * O algoritmo deve ser neutro e não penalizar perfis iniciantes ou com repositórios privados.
* **RF17 — Ranking Público Gamificado (Futuro)**:
  * Tabela de classificação pública dos personagens mais poderosos, com filtros por universo e período.

### Módulo G — Auditoria, Moderação e Segurança
* **RF18 — Registro Inviolável de Auditoria (MVP)**:
  * Toda ação de criação, alteração, arquivamento (`soft delete`) e restauração de fichas deve gravar um registro na tabela de auditoria com: `id_ficha`, `acao`, `autor_id` e `data_hora`.
  * Falhas na gravação da auditoria não devem travar o sistema principal, mas devem disparar logs de erro de servidor.
* **RF19 — Denúncia e Moderação de Fichas (V2)**:
  * Sistema de sinalização (*flagging*) onde usuários podem denunciar perfis com nomes ou conteúdos impróprios para análise por moderadores.

### Módulo H — Gestão de Salas de Aula para Professores
* **RF20 — Espaço do Educador (V2)**:
  * Permite ao professor criar salas virtuais, gerar códigos de acesso para alunos, acompanhar a matriz de progresso da turma e atribuir missões personalizadas.

### Módulo I — Configurações de Privacidade
* **RF21 — Controle de Privacidade do Aluno (V2)**:
  * Opções no painel do usuário para ocultar e-mail pessoal e optar por não aparecer no ranking público.

---

## 4. Regras de Negócio (RN)

* **RN01 — Faixa Numérica do Atributo Poder**: O valor de `poder` de qualquer ficha deve se manter estritamente no intervalo entre `0` e `100`, inclusive.
* **RN02 — Validação Estrita de Universos (ENUM)**: O campo `universo` aceita estritamente os 7 valores configurados: Marvel, DC, Star Wars, Tolkien, D&D, Anime, Games. Inserções fora dessa lista são rejeitadas pelo banco e pela validação server-side.
* **RN03 — Obrigatoriedade de Soft Delete**: A remoção de fichas na aplicação é obrigatoriamente uma exclusão lógica (`ativo = 0`). Exclusões físicas (`DELETE FROM`) são vedadas nas rotinas comuns da aplicação.
* **RN04 — Restrição de Operações SQL em Massa**: Todas as consultas de alteração ou arquivamento no banco de dados devem obrigatoriamente conter a cláusula `WHERE id = :id` vinculada a um identificador único, evitando mutações acidentais em massa.
* **RN05 — Formato Padrão de Username do GitHub**: Nomes de usuário do GitHub informados devem bater com a Expressão Regular `^[a-zA-Z0-9]((?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})$` (máximo de 39 caracteres).
* **RN06 — Imutabilidade dos Logs de Auditoria**: Registros de auditoria são de leitura exclusiva e não podem sofrer alterações (`UPDATE`) ou deleções (`DELETE`) por nenhum usuário do sistema.
* **RN07 — Exclusividade de Curadoria Oficial**: Apenas usuários com perfil Administrador podem criar ou alterar as missões e módulos oficiais da plataforma.
* **RN08 — Neutralidade do Cálculo Automático de Poder**: Desenvolvedores com perfis recentes ou sem conta no GitHub mantêm o direito de definir seu valor de poder manualmente até que a integração automática seja ativada.
* **RN09 — Direito ao Esquecimento (LGPD) vs. Soft Delete**: `ativo = 0` (RN03) é uma decisão de negócio, reversível pelo dono ou por admin, e não substitui o direito de exclusão definitiva previsto na LGPD. Mediante solicitação formal do titular, o Administrador executa uma rotina distinta de anonimização/exclusão física dos dados pessoais (e-mail, data de nascimento, senha) da ficha e da conta, preservando apenas o identificador técnico e o registro em `auditoria` (ação "EXCLUSAO_LGPD"), necessário para comprovar o cumprimento da solicitação.
* **RN10 — Posse de Ficha**: toda ficha pertence a exatamente um `usuario_id` (autenticado via RF01a/RF01b). Não existe criação de ficha por visitante anônimo; isso é o que torna RF01a um requisito de MVP (ver nota no Módulo A).

---

## 5. Requisitos Não Funcionais (RNF) e Diretrizes de Segurança

As diretrizes de segurança e qualidade seguem o checklist oficial da apostila de desenvolvimento do IFRO (*Programar com IA de Forma Responsável*):

* **RNF01 — Prevenção contra SQL Injection**: Uso estrito e obrigatório de *Prepared Statements* (parâmetros vinculados via PDO/Prisma/ORM) em 100% das consultas ao banco de dados.
* **RNF02 — Criptografia de Senhas e Segurança de Acesso**: Senhas de usuários devem ser obrigatoriamente armazenadas no banco utilizando algoritmos de hash seguros e irreversíveis (ex.: `bcrypt` com fator de custo >= 10 ou `Argon2id`). Nunca salvar senhas em texto puro.
* **RNF03 — Proteção contra Cross-Site Scripting (XSS) e CSRF**: Todo dado vindo do usuário deve ser sanitizado e ter escape de caracteres na renderização de telas (`htmlspecialchars` ou escape automático no JSX).
* **RNF04 — Isolamento de Credenciais em Variáveis de Ambiente**: Nenhuma chave de API, senha de banco de dados ou segredo de sessão pode ser gravado diretamente no código fonte. Todos os segredos devem residir em um arquivo `.env` protegido e ignorado pelo Git (`.gitignore`).
* **RNF05 — Responsividade e Usabilidade (WCAG AA)**: A interface deve ser plenamente utilizável em dispositivos móveis e desktops, atendendo aos critérios mínimos de acessibilidade de alto contraste e navegação por teclado.
* **RNF06 — Conformidade com a Lei Geral de Proteção de Dados (LGPD)**: Coleta restrita aos dados necessários para o funcionamento do sistema, com transparência e mecanismos para correção e exclusão pelo titular.
* **RNF07 — Arquitetura de Hospedagem de Baixo Custo e Deploy Contínuo**: A aplicação deve ser compatível com arquitetura Serverless/Node.js hospedada na **Vercel**, conectada com deploy contínuo ao repositório do **GitHub** e banco de dados relacional em nuvem (ex.: Neon Postgres / Supabase).
* **RNF08 — Backup e Recuperação de Desastres**: o provedor de banco de dados em nuvem deve manter backups automáticos diários com retenção mínima de 7 dias (RPO ≤ 24h). Antes de qualquer migração de schema, um dump manual adicional deve ser feito e registrado no `CHANGELOG.md`.
* **RNF09 — Observabilidade Mínima**: erros não tratados no servidor (5xx) devem ser logados com timestamp, rota e stack trace, sem expor esses detalhes ao usuário final (ver RF18 e Cenário 4).

### 5.1 Variáveis de Ambiente (nunca commitadas — ver Anexo de segurança do processo)

| Variável | Finalidade |
| :--- | :--- |
| `DATABASE_URL` | Connection string do Postgres (Neon/Supabase) |
| `SESSION_SECRET` / `JWT_SECRET` | Chave de assinatura da sessão do usuário |
| `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` | Credenciais do OAuth App do GitHub (RF01b) |
| `GITHUB_API_TOKEN` (opcional) | Token pessoal para elevar o limite de 60 para 5.000 req/h na consulta de perfis (RF11/RF12) |
| `SMTP_*` | Envio do e-mail de recuperação de senha (RF01a) |

---

## 6. Modelo de Dados Relacional (DER / Schema SQL)

```sql
-- Tabela de Usuários / Autenticação
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255),              -- NULL permitido: conta pode ter sido criada só via OAuth (RF01b)
    github_oauth_id VARCHAR(50) UNIQUE,   -- id numérico estável do GitHub, preenchido no login OAuth (RF01b)
    tipo VARCHAR(20) DEFAULT 'estudante' CHECK (tipo IN ('estudante', 'professor', 'moderador', 'admin')),
    tentativas_login INT DEFAULT 0,
    bloqueado_ate TIMESTAMP,              -- suporta o RF01a (bloqueio após 5 falhas)
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_metodo_login CHECK (senha_hash IS NOT NULL OR github_oauth_id IS NOT NULL)
);

-- Tokens de recuperação de senha (RF01a)
CREATE TABLE tokens_reset_senha (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expira_em TIMESTAMP NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fichas de Personagem
CREATE TABLE fichas (
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

-- Tabela de Módulos da Trilha Pedagógica
CREATE TABLE modulos (
    id SERIAL PRIMARY KEY,
    ordem INT UNIQUE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    tecnologia VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL
);

-- Tabela de Missões / Exercícios
CREATE TABLE missoes (
    id SERIAL PRIMARY KEY,
    modulo_id INT REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    codigo_inicial TEXT,
    criterio_aceite TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Missões Concluídas
CREATE TABLE missoes_concluidas (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE CASCADE,
    missao_id INT REFERENCES missoes(id) ON DELETE CASCADE,
    data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ficha_id, missao_id)
);

-- Tabela de Auditoria Inviolável
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    ficha_id INT REFERENCES fichas(id) ON DELETE SET NULL,
    autor_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    acao VARCHAR(50) NOT NULL,
    detalhes TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. Critérios de Aceite (BDD — Behavior-Driven Development)

* **Cenário 1: Cadastro com Sucesso de Ficha de Personagem**
  * **Dado que** o estudante está autenticado e preenche o formulário com Nome="Aragorn", Universo="Tolkien", Classe="Ranger", Poder=85 e Username GitHub="aragorn-dev",
  * **Quando** clica em "Salvar Ficha",
  * **Então** o sistema executa a validação server-side, insere o registro no banco de dados com `ativo = 1`, grava uma entrada na tabela de `auditoria` com a ação "CRIACAO" e redireciona para a listagem pública exibindo a nova ficha.

* **Cenário 2: Rejeição de Validação com Retenção de Estado**
  * **Dado que** o usuário preenche o formulário com um valor de Poder inválido (ex.: 150),
  * **Quando** envia o formulário,
  * **Então** a validação server-side rejeita a gravação, retorna o código de erro HTTP 422, exibe o alerta "O poder deve estar entre 0 e 100" e mantém todos os demais campos do formulário preenchidos com o texto digitado.

* **Cenário 3: Exclusão Lógica e Ocultação da Listagem**
  * **Dado que** o dono de uma ficha clica na opção "Arquivar Ficha" e confirma na caixa de diálogo,
  * **Quando** a requisição é processada,
  * **Então** o sistema executa a instrução `UPDATE fichas SET ativo = 0 WHERE id = :id`, registra o log de auditoria "ARQUIVAMENTO" e remove imediatamente o personagem da listagem de ativos.

* **Cenário 4: Resiliência na Integração com a API do GitHub**
  * **Dado que** a API do GitHub está indisponível ou ultrapassou o limite de requisições sem autenticação,
  * **Quando** o usuário abre a página de detalhes de uma ficha com vínculo do GitHub,
  * **Então** o sistema aguarda até o limite de timeout (3s), exibe os dados cadastrais da ficha normalmente e apresenta um aviso suave: "Métricas do GitHub indisponíveis no momento".

---

## 8. Metodologia de Desenvolvimento com o Google Antigravity (IFRO)

O desenvolvimento deste sistema deve seguir rigorosamente as 7 Fases da metodologia de *Spec-Driven Development* apresentada na apostila do IFRO:

1. **Fase 1 — Planejamento e Aprovação da Spec**: Leitura e validação deste arquivo `spec.md` junto ao professor/orientador.
2. **Fase 2 — Configuração do Ambiente**:
   * Instalação do Google Antigravity e login na conta Google.
   * Autenticação no terminal do Antigravity via GitHub CLI (`gh auth login`).
   * Inicialização do repositório Git local (`git init`) e vínculo com o GitHub remoto.
3. **Fase 3 — Desenvolvimento Assistido por Agente**:
   * Utilizar modo de autonomia **Agent-Assisted** ou **Review-Driven** (obrigatório para autenticação e banco de dados).
   * Enviar prompts pequenos e contextualizados referenciando seções da `spec.md` (ex.: *"Com base no Módulo B e na regra RN01 da spec.md, crie o formulário de cadastro com validação server-side"*).
   * Revisar detalhadamente os *Artifacts* (planos) e *Diffs* (código alterado) antes de aprovar.
4. **Fase 4 e 5 — Testes e Correções Responsáveis**:
   * Executar testes funcionais manuais para cada critério de aceite BDD.
   * Conferir o checklist de segurança (Prepared Statements, Hashes de Senha, `.env`).
5. **Fase 6 — Deploy na Vercel**:
   * Conectar o repositório GitHub à Vercel.
   * Configurar variáveis de ambiente do banco de dados no painel da Vercel.
   * Acompanhar os builds automáticos a cada `git push`.
6. **Fase 7 — Apresentação e Defesa do Projeto**:
   * Demonstração do sistema publicado no link da Vercel.
   * Apresentação do histórico de commits no GitHub e defesa das decisões tomadas.
