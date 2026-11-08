# Changelog — CodeQuest ⚔️💻

Registro cronológico e detalhado de decisões técnicas de arquitetura, correções, refatorações e revisões críticas realizadas sobre as propostas do agente de inteligência artificial durante o ciclo de desenvolvimento do projeto.

---

## [1.1.0] - 2026-11-07 (Expansão dos 4 Módulos Interativos, Otimização de Banco & Sessão Reativa)

### 🚀 Adicionado
- **Módulo 1 — Programação em Blocos (ScratchQuest)**:
  - 6 Aulas interativas explicativas com mini-simuladores visuais animados (Fluxo Sequencial, Decisões SE/SENÃO, Loops, Variáveis/Mana, Funções modulares e Eventos).
  - Estúdio Scratch com Palco 2D em grade, personagens (`🧙‍♂️`), moedas, orbes, chaves e portais mágicos.
  - 8 Desafios progressivos com persistência local e síntese nativa de efeitos sonoros retrô via Web Audio API.
- **Módulo 2 — Python (A Ponte dos Blocos para o Código)**:
  - 6 Aulas conceituais com mini-simuladores comparando blocos visuais com sintaxe Python real (indentação de 4 espaços, loops `for` com `range()`, funções `def` e classes POO).
  - Laboratório Python IDE integrado com editor de código monoespaçado, console stdout estilizado, suíte de testes unitários automatizados (Pass/Fail) e visor "Como seria em Blocos?".
- **Módulo 3 — HTML5 & CSS3 (A Forja Visual da Web)**:
  - 6 Aulas explicativas com mini-simuladores (Estrutura Semântica, Box Model concêntrico com sliders, Forja de Cristais com néon glow, alinhamento Flexbox e CSS Grid).
  - Laboratório Web Playground com editor duplo (HTML/CSS), preview ao vivo em sandbox seguro (Desktop e Mobile 375px) e testes de validação automática.
- **Módulo 4 — JavaScript (O Cérebro Reativo & DOM)**:
  - 6 Aulas com mini-simuladores didáticos (`let`/`const`, manipulação do DOM ao vivo com `.textContent` e classes, `addEventListener`, métodos funcionais `.filter/.map/.reduce`, Promises com `async/await` e POO).
  - Laboratório JavaScript IDE com Palco DOM Vivo (botões e barras de vida reais manipulados por código), console de depuração e testes unitários.
- **Infraestrutura, Sessão e Banco de Dados**:
  - População das 16 missões oficiais dos 4 nichos no PostgreSQL/Neon via script de seed.
  - Rota `/api/auth/me` para identificação da sessão ativa do usuário.
  - Barra de Navegação (`Navbar`) reativa exibindo `🧙‍♂️ [Nome] • Online no BD` e botão de encerramento de sessão (Logout).
  - Página e API de Redefinição de Senha (`/redefinir-senha` e `/api/auth/redefinir-senha`) com validação de força e hash `bcrypt`.
  - Usuário de teste pré-configurado: `aluno@codequest.dev` / `SenhaForte123!`.

### 🛠️ Revisões e Correções Críticas sobre o que a IA propôs (Supervisão Humana)
1. **Otimização da Conexão Neon Pooler (Resolução de Timeouts na Vercel)**:
   - *O que a IA propôs inicialmente*: Manter a string de conexão padrão do Neon contendo o parâmetro `channel_binding=require`.
   - *Revisão humana aplicada*: Identificou-se que a negociação SSL com `channel_binding=require` no PgBouncer causava um atraso de 27 a 40 segundos, estourando o limite de 10s da Vercel. A string foi otimizada e adicionou-se `directUrl = env("DATABASE_URL_UNPOOLED")` no `prisma/schema.prisma`. O tempo de resposta caiu de **40.000ms para 1.600ms**, permitindo salvar contas no banco com sucesso instantâneo.
2. **Arquitetura de Efeitos Sonoros (Web Audio API vs Arquivos Pesados)**:
   - *O que a IA propôs*: Fazer download de múltiplos arquivos `.mp3` ou `.wav` para efeitos sonoros de cliques e vitória.
   - *Revisão humana aplicada*: Rejeitou-se a importação de mídias pesadas para evitar overhead de rede. Implementou-se um sintetizador de ondas senoidais e dente-de-serra nativo via Web Audio API do navegador, com zero kilobytes adicionais de dependência.
3. **Fluxo de Autenticação e Experiência do Usuário (UX/DX)**:
   - *O que a IA propôs*: Redirecionar o usuário recém-cadastrado de volta para a tela de login vazia e usar cookies `SameSite: Strict`.
   - *Revisão humana aplicada*: Ajustou-se o cookie para `SameSite: Lax` para evitar perda de credenciais em redirecionamentos e configurou-se o cadastro para autenticar o aluno e enviá-lo diretamente à `/trilha`, gerando uma experiência fluida.
4. **Isolamento de Execução e Prevenção de Loops**:
   - *O que a IA propôs*: Executar scripts com `eval()` direto sem sandbox.
   - *Revisão humana aplicada*: Encapsulou-se a execução em ambiente isolado com `new Function()` passando mocks controlados de DOM e captura interceptada de `console.log`.

---

## [1.0.0] - 2026-11-04 (Release de Entrega e Publicação)

### 🚀 Adicionado
- **Autenticação Segura com Validação Estrita de Hash (RF01a / RNF01)**: Rota `/api/auth/login` conectada ao banco PostgreSQL via Prisma, com comparação obrigatória de hash usando `bcrypt.compare` impedindo senhas arbitrárias, contagem de tentativas com bloqueio temporário após 5 falhas consecutivas e emissão de cookies seguros de sessão `HttpOnly`.
- **Cadastro com Persistência Relacional**: Rota `/api/auth/cadastro` gravando novos usuários com hash bcrypt (custo 10) e consentimento dos termos.
- **Encerramento de Sessão (RF01e)**: Rota `/api/auth/logout` com revogação no banco de dados e expiração de cookies.
- **Deploy em Produção na Vercel ([https://code-quest-06.vercel.app](https://code-quest-06.vercel.app))**: Aplicação compilada e hospedada com sucesso em ambiente Serverless na Vercel com domínio de produção ativo e seguro (HTTPS/HSTS).
- **Banco de Dados Remoto PostgreSQL (Neon Serverless)**: Provisionamento de instância remota gerenciada do PostgreSQL, integrada às variáveis de ambiente da Vercel e sincronizada via `prisma db push` com todas as 11 tabelas.
- **Guia de Instalação na Seção 3 da Spec ([`spec.md`](./spec.md))**: Inclusão de instruções detalhadas passo a passo de pré-requisitos, variáveis de ambiente, migração do banco com Prisma e scripts de execução local e produção.
- **Script SQL Padronizado de Banco de Dados ([`database/schema.sql`](./database/schema.sql))**: Disponibilização do DDL SQL nativo para PostgreSQL contendo todas as 11 tabelas, índices parciais, constraints CHECK e regras de integridade referencial.
- **Documentação de Changelog ([`CHANGELOG.md`](./CHANGELOG.md))**: Criação deste documento consolidado para prestação de contas das decisões de engenharia de software e revisões das propostas de IA.

---

## [0.3.0] - 2026-10-06 (Implementação das Telas, Rotas e Segurança)

### 🚀 Adicionado
- **Interface e Telas Principais**:
  - Landing page temática de RPG (`/`) com hero section, showcase dos 7 universos e trilha de aprendizagem.
  - Telas completas de autenticação: Login (`/login`), Cadastro com consentimento LGPD (`/cadastro`), Esqueci minha senha (`/esqueci-senha`), Redefinição (`/redefinir-senha`) e Confirmação de e-mail (`/verificar-email`).
  - Módulo de fichas: Criação (`/fichas/nova`), listagem paginada (`/fichas`), visualização de métricas (`/fichas/[id]`), edição e gerenciamento de arquivadas (`/fichas/arquivadas`).
  - Telas dos módulos complementares: Trilha pedagógica (`/trilha`), catálogo de missões (`/missoes`), salas virtuais (`/salas`), ranking (`/ranking`) e painel administrativo (`/admin`).
- **Segurança e Conformidade**:
  - Injeção de cabeçalhos de segurança HTTP em [`next.config.mjs`](./next.config.mjs) (`Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`).
  - Hash de senhas com `bcryptjs` garantindo salt de 10 rounds (**RNF01**).
  - Validação espelhada cliente/servidor com schemas Zod em [`src/lib/validations/`](./src/lib/validations/).

### 🛠️ Revisões e Correções sobre o que o Agente de IA propôs
1. **Unicidade de Ficha Ativa (RN06) no Banco de Dados**:
   - *O que a IA propôs originalmente*: Validar se o usuário já possuía ficha ativa apenas na camada de aplicação (no handler da API).
   - *Revisão aplicada*: Identificou-se risco de concorrência (*race condition*). Foi adicionado um índice parcial exclusivo no PostgreSQL (`CREATE UNIQUE INDEX idx_ficha_ativa_unica_por_usuario ON fichas(usuario_id) WHERE ativo = TRUE`), garantindo integridade a nível de banco.
2. **Integração com API do GitHub e Tolerância a Falhas (RF12 / RNF09)**:
   - *O que a IA propôs*: Realizar chamadas diretas com `fetch` simples ao carregar o perfil.
   - *Revisão aplicada*: Adicionado timeout estrito de 3 segundos com `AbortController` e persistência na tabela `github_cache` (expiração de 1 hora) para contornar limites de taxa (60 req/h) e evitar tela branca caso o GitHub fique instável.
3. **Persistência de Sessões Serverless**:
   - *O que a IA propôs*: Sugestão inicial de variáveis globais de memória ou JWT puro sem revogação.
   - *Revisão aplicada*: Substituído por cookie seguro com tabela `sessoes` no banco de dados para possibilitar o encerramento remoto de todas as sessões ativas (**RF01e**) e total compatibilidade com a arquitetura serverless da Vercel.

---

## [0.2.0] - 2026-09-22 (Revisão e Fechamento da Especificação da Spec)

### 📝 Decisões de Arquitetura
- **Alinhamento com o Modelo Pedagógico da Apostila**:
  - Reorganização da especificação [`spec.md`](./spec.md) nas 8 seções padronizadas.
  - Criação do diagrama DER completo em sintaxe Mermaid (Seção 6) ilustrando o relacionamento das 11 entidades.
  - Especificação detalhada de critérios de aceite no formato BDD/Gherkin (*Dado/Quando/Então*).
- **Escolha da Stack e Destino de Hospedagem**:
  - **Front-end & Back-end**: Next.js 14 com App Router e TypeScript (elimina a necessidade de servidores heterogêneos).
  - **Banco de Dados**: PostgreSQL em nuvem gerenciada (Neon Serverless) acessado via Prisma ORM.
  - **Plataforma de Deploy**: Vercel com integração contínua (CI/CD) vinculada aos branches do GitHub.

---

## [0.1.0] - 2026-09-20 (Concepção Inicial)

### 💡 Inicial
- Criação do repositório no GitHub (`code-quest-06`).
- Definição do escopo da plataforma gamificada CodeQuest para portfólio verificável de programadores iniciantes.
- Primeiros rascunhos dos requisitos de fichas, universos e integração com métricas do GitHub.

