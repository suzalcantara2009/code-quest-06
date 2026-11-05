# Changelog — CodeQuest ⚔️💻

Registro cronológico e detalhado de decisões técnicas de arquitetura, correções, refatorações e revisões críticas realizadas sobre as propostas do agente de inteligência artificial durante o ciclo de desenvolvimento do projeto.

---

## [1.0.0] - 2026-11-04 (Release de Entrega e Publicação)

### 🚀 Adicionado
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
