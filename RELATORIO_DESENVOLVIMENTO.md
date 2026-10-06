# Relatório Completo de Desenvolvimento — CodeQuest ⚔️💻

**Projeto:** CodeQuest — Plataforma Web Gamificada para Desenvolvedores  
**Repositório:** [https://github.com/suzalcantara2009/codequest-antigravity.git](https://github.com/suzalcantara2009/codequest-antigravity.git)  
**Branch:** `main`  
**Data:** 06 de Outubro de 2026  
**Status do Projeto:** Fase de Bootstrap, Modelagem e Telas Iniciais Concluída (Build 100% Validado)

---

## 1. Visão Geral e Bootstrap do Projeto

### 1.1 Análise e Leitura da Especificação Técnica (`spec.md`)
O desenvolvimento iniciou-se com o estudo minucioso do documento [`spec.md`](./spec.md), estruturado nas 8 seções normativas da apostila do projeto:
1. **Objetivo**: Criação de uma plataforma web gamificada que resolve o desengajamento de desenvolvedores júniores e estudantes de TI em portfólios estáticos (ex.: perfis simples do GitHub), introduzindo o conceito de "ficha de personagem de RPG" com poder de combate vinculado a missões concluídas e métricas reais verificáveis do GitHub.
2. **Usuários e Papéis**: Definição de perfis de acesso: *Visitante*, *Estudante / Desenvolvedor Júnior*, *Professor / Educador*, *Moderador de Conteúdo* e *Administrador / Curador Oficial*.
3. **Casos de Uso**: Mapeamento dos 24 fluxos essenciais de interação.
4. **Requisitos Funcionais (RF01a – RF23)**: Reorganizados em 10 módulos distintos (Módulo A ao Módulo J).
5. **Regras de Negócio e Requisitos Não Funcionais**:
   - **RN01 a RN13**: Intervalo estrito de poder (0–100), unicidade de ficha ativa por usuário (**RN06**), lista fechada de 7 universos (**RN02**), imutabilidade da tabela de auditoria (**RN04**), expiração de sessões por inatividade (**RN11**), etc.
   - **RNF01 a RNF19**: Hash de senhas com bcrypt (custo ≥ 10), prevenção de XSS e SQL Injection via prepared statements, segurança HTTP (**RNF14**, **RNF15**), arquitetura serverless compatível com Vercel/Neon e idioma pt-BR (**RNF19**).
   - **RI01 a RI10**: Retenção de estado de formulários, confirmação por modal para ações destrutivas, estados vazios amigáveis, responsividade e toasts.
6. **Modelo de Dados (DER)**: Esquema relacional com 11 tabelas interligadas.
7. **Critérios de Aceite**: Cenários no formato Gherkin (*Dado/Quando/Então*).
8. **Decisão de Stack e Deploy**: Next.js (App Router) + PostgreSQL (Neon) na Vercel.

---

### 1.2 Estruturação Inicial do Workspace, Dependências e Configurações

O ambiente de desenvolvimento foi configurado no ecossistema Node.js v22 com suporte a TypeScript estrito e Tailwind CSS.

#### Dependências Instaladas (`package.json`)
- **Core / Framework**:
  - `next`: `^14.2.15` (App Router para execução Serverless e SSR)
  - `react` & `react-dom`: `^18.3.1`
- **Modelagem & Banco de Dados**:
  - `@prisma/client`: `^5.21.1`
  - `prisma`: `^5.21.1` (DevDependency)
- **Validação & Segurança**:
  - `zod`: `^3.23.8` (Validação de schemas no client e server)
  - `bcryptjs` & `@types/bcryptjs`: Hash seguro de senhas com custo mínimo de 10
- **Estilização & Ícones**:
  - `tailwindcss`: `^3.4.14`
  - `postcss`: `^8.4.47`
  - `autoprefixer`: `^10.4.20`
  - `lucide-react`: Biblioteca de ícones moderna
  - `clsx` & `tailwind-merge`: Utilitário de composição de classes CSS

#### Configurações Base do Projeto
- [`tsconfig.json`](./tsconfig.json): Ativação de checagem estrita (`"strict": true`), exclusão de compilação desnecessária e configuração do path alias `@/*` mapeando para `./src/*`.
- [`next.config.mjs`](./next.config.mjs): Implementação direta dos requisitos **RNF14** e **RNF15** injetando cabeçalhos de segurança HTTP em todas as rotas:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - Configuração de `remotePatterns` para carregar avatares do GitHub (`avatars.githubusercontent.com`).
- [`tailwind.config.ts`](./tailwind.config.ts) & [`postcss.config.mjs`](./postcss.config.mjs): Extensão de tema com as cores semânticas da identidade RPG (`quest-dark`, `quest-surface`, `quest-border`, `quest-accent`, `quest-gold`).
- [`.env.example`](./.env.example): Declaração padronizada de todas as credenciais necessárias em conformidade com **RNF05**, contendo referências para `DATABASE_URL`, `SESSION_SECRET`, `JWT_SECRET`, `GITHUB_OAUTH_*`, `GITHUB_API_TOKEN`, `GITHUB_WEBHOOK_SECRET` e configurações SMTP.
- [`.gitignore`](./.gitignore): Proteção de variáveis de ambiente (`.env*`), dependências (`node_modules`) e artefatos de compilação do Next.js (`.next`, `build`).

---

### 1.3 Modelagem de Dados, Utilitários do Servidor e Componentes Base

#### Modelagem Relacional
1. **Prisma ORM ([`prisma/schema.prisma`](./prisma/schema.prisma))**:
   Definição relacional completa mapeando 11 entidades com chaves primárias, estrangeiras e constraints:
   - `Usuario`: Identidade, controle de bloqueio (`tentativas_login`), verificação de e-mail e aceite de termos.
   - `TokenResetSenha`: Tokens com expiração para recuperação de senha (**RF01a**).
   - `Sessao`: Controle de refresh tokens ativos para logout global (**RF01e**).
   - `GithubCache`: Cache persistido de métricas do GitHub por 1 hora (**RF12**).
   - `Ficha`: Personagem associado ao usuário, universo, poder e status ativo.
   - `Modulo`: Módulos da trilha sequencial (**RF13**).
   - `Missao` & `MissaoConcluida`: Desafios cadastrados e histórico único por ficha.
   - `Denuncia`: Moderação de conteúdo com motivo e status (**RF19**).
   - `Sala` & `SalaAluno`: Gestão de turmas de educadores com código de acesso (**RF20**).
   - `Auditoria`: Tabela append-only imutável para rastreamento de ações (**RF18**, **RN04**).
2. **DDL PostgreSQL Puro ([`sql/schema.sql`](./sql/schema.sql))**:
   Arquivo contendo o script SQL nativo com constraints avançadas:
   - `idx_ficha_ativa_unica_por_usuario` (`WHERE ativo = TRUE`) garantindo **RN06** no nível do banco.
   - `idx_github_unico_em_ficha_ativa` assegurando **RN09**.
   - `CHECK` em universos permitidos, poder entre 0 e 100 e tipo de usuário.

#### Utilitários de Servidor e Schemas de Validação
- [`src/lib/db.ts`](./src/lib/db.ts): Instância singleton do Prisma Client evitando esgotamento de conexões em ambiente serverless.
- [`src/lib/auth.ts`](./src/lib/auth.ts): Helpers criptográficos para hash (`bcryptjs` com 10 rounds) e infraestrutura de verificação.
- [`src/lib/github.ts`](./src/lib/github.ts): Utilitário de integração com API do GitHub configurado com timeout de 3 segundos (**RF12**) e regex oficial de username (**RF10**).
- [`src/lib/audit.ts`](./src/lib/audit.ts): Helper de registro inviolável na tabela `auditoria` com tratamento de erro tolerante a falhas (**RNF09**).
- [`src/lib/rate-limit.ts`](./src/lib/rate-limit.ts): Boilerplate para mitigação de abuso (**RNF13**, **RF01a**).
- [`src/lib/validations/`](./src/lib/validations/): Conjunto de schemas Zod (`auth.ts`, `ficha.ts`, `missao.ts`, `sala.ts`, `denuncia.ts`) garantindo validação espelhada no cliente e servidor (**RNF02**).

#### Componentes de UI Base (`src/components/ui/`)
- [`Button.tsx`](./src/components/ui/Button.tsx): Suporte a variantes (`primary`, `secondary`, `danger`, `outline`, `ghost`), tamanhos e indicador de carregamento animado.
- [`Input.tsx`](./src/components/ui/Input.tsx): Suporte a ícones à esquerda/direita, indicador de campo obrigatório com asterisco vermelho (**RI08**), retenção de valor (**RI01**) e mensagens de erro específicas (**RI07**).
- [`Modal.tsx`](./src/components/ui/Modal.tsx): Modal acessível via teclado (`Escape`), foco gerenciado e backdrop com blur para ações destrutivas (**RI02**).
- [`Pagination.tsx`](./src/components/ui/Pagination.tsx): Componente com exibição explícita da página atual e total de páginas (**RI10**).
- [`Toast.tsx`](./src/components/ui/Toast.tsx): Notificação flutuante com feedback visual de sucesso/erro (**RI09**).
- [`LoadingSpinner.tsx`](./src/components/ui/LoadingSpinner.tsx) & `Skeleton`: Indicadores visuais para requisições assíncronas (**RI06**).
- [`EmptyState.tsx`](./src/components/ui/EmptyState.tsx): Mensagens amigáveis para buscas vazias (**RI03**).
- [`Card.tsx`](./src/components/ui/Card.tsx) e [`Badge.tsx`](./src/components/ui/Badge.tsx): Cartões temáticos e distintivos estilizados.

---

## 2. Telas e Interface de Usuário Criadas

### 2.1 Landing Page / Apresentação (`/` — [`src/app/page.tsx`](./src/app/page.tsx))
- **Visual e Atmosfera RPG**: Fundo dark com gradientes suaves em tons de azul e índigo, ambient glow (`blur-[120px]`) e tipografia de alto contraste (**RI05**).
- **Hero Section**:
  - Badge em destaque comemorando a *Temporada 1*.
  - Título impactante e subtítulo explicando o valor de portfólio ativo em contraste com repositórios estáticos.
  - Duplo Call to Action: Botão principal "Criar Minha Ficha" direcionando ao cadastro e botão secundário "Explorar Personagens" para a listagem pública.
- **Card Preview Interativo de Personagem**:
  - Mockup visual completo de uma ficha ("Aragorn Dev", Guardião Fullstack, Universo Tolkien).
  - Barra de progresso dinâmica ilustrando Poder 85/100.
  - Integração visual com GitHub (@aragorn-coder, 24 repositórios, 182 estrelas, status "Verificado").
  - Badge de status ativo e identificador de auditoria imutável.
- **Seção "Como Funciona"**: 3 etapas explicativas em cards: Criação de Ficha, Conclusão de Missões e Conexão com GitHub.
- **Showcase dos 7 Universos Permitidos (**RF03** / **RN02**)**: Grade visual destacando Marvel, DC, Star Wars, Tolkien, D&D, Anime e Games.
- **Currículo da Trilha Pedagógica em 4 Módulos (**RF13**)**: Cards temáticos para Programação em Blocos, Python, HTML5/CSS3 e JavaScript.
- **Seções de Segurança e CTA Final**: Destaque para conformidade com a LGPD (**RF21a**), auditoria inviolável e chamada de conversão final.

---

### 2.2 Tela de Login (`/login` — [`src/app/login/page.tsx`](./src/app/login/page.tsx))
- **Design & Layout**: Card centralizado com efeitos de vidro (*backdrop-blur*), paleta slate/indigo e iluminação ambiente.
- **Formulário Reativo e Componentes**:
  - Campo de e-mail com ícone contextual (`Mail`).
  - Campo de senha com ícone de cadeado (`Lock`) e botão interativo para alternar visibilidade (mostrar/ocultar senha com ícones `Eye`/`EyeOff`).
  - Link direto para recuperação de senha ("Esqueceu sua senha?").
- **Validação e Tratamento de Erros (**RI01**, **RI07**, **RNF02**)**:
  - Integração completa com o schema Zod `loginSchema`.
  - Sinalização visual com bordas vermelhas nos campos e mensagens de erro específicas abaixo de cada entrada.
  - Alerta geral (`AlertCircle`) para erros de autenticação ou indisponibilidade de servidor.
- **Feedback Visual (**RI06**, **RI09**)**:
  - Botão com estado de carregamento e spinner animado desabilitado durante o envio.
  - Exibição de Toast de confirmação visual após o sucesso e redirecionamento programado para `/fichas`.
- **Login Social (**RF01b**)**: Botão de integração com OAuth do GitHub estilizado com ícone oficial.

---

### 2.3 Tela de Cadastro (`/cadastro` — [`src/app/cadastro/page.tsx`](./src/app/cadastro/page.tsx))
- **Design & Layout**: Estrutura responsiva com card estendido, ícone de cabeçalho `UserPlus` e selos de segurança no rodapé.
- **Formulário Completo**:
  - `Nome Completo` (validação de 2 a 100 caracteres com ícone `User`).
  - `Endereço de E-mail` (validação de formato e unicidade com ícone `Mail`).
  - `Senha Secreta` (mínimo de 8 caracteres) e `Confirmar Senha`, ambos com botões independentes de alternância de visibilidade.
- **Validação de Confirmação de Senha**: Verificação em tempo real garantindo que os dois campos de senha coincidam perfeitamente antes do envio.
- **Aceite Obrigatório dos Termos e LGPD (**RF01f**)**:
  - Container estilizado com checkbox não pré-marcado.
  - Texto de aceite com links explícitos abrindo os Termos de Uso e a Política de Privacidade ([`/termos`](./src/app/termos/page.tsx)).
  - Validação estrita impedindo submissão caso o termo não seja aceito.
- **Fluxo de Ativação por E-mail (**RF01c**, **RN12**)**:
  - Mensagem de sucesso via Toast e redirecionamento para a página explicativa de ativação pendente ([`/verificar-email`](./src/app/verificar-email/page.tsx)).

---

### 2.4 Demais Estruturas de Rotas Preparadas
Todas as rotas do projeto foram criadas com estrutura funcional, layouts e placeholders semânticos para garantir cobertura completa dos requisitos:

| Rota | Módulo / Requisito | Descrição |
|---|---|---|
| [`/fichas`](./src/app/fichas/page.tsx) | Módulo C (RF07, RF08) | Listagem pública com paginação, busca e filtro por universo. |
| [`/fichas/nova`](./src/app/fichas/nova/page.tsx) | Módulo B (RF02, RF03, RF04) | Formulário de criação de personagem com seleção dos 7 universos. |
| [`/fichas/[id]`](./src/app/fichas/[id]/page.tsx) | Módulo B/D (RF11, RF12, RF05) | Perfil do personagem, card do GitHub e modal de arquivamento. |
| [`/fichas/[id]/editar`](./src/app/fichas/[id]/editar/page.tsx) | Módulo B (RF04) | Edição cadastral da ficha ativa. |
| [`/fichas/arquivadas`](./src/app/fichas/arquivadas/page.tsx) | Módulo C (RF06, RF09) | Área de fichas inativas e fluxo de restauração (**RN06**). |
| [`/trilha`](./src/app/trilha/page.tsx) | Módulo E (RF13) | Trilha pedagógica com os 4 módulos interligados. |
| [`/trilha/[moduloId]`](./src/app/trilha/[moduloId]/page.tsx) | Módulo E (RF13a) | Detalhamento de módulo e progresso de aprendizado. |
| [`/missoes`](./src/app/missoes/page.tsx) | Módulo E (RF14a) | Catálogo de missões com filtro por dificuldade. |
| [`/missoes/[id]`](./src/app/missoes/[id]/page.tsx) | Módulo E (RF14, RF15) | Enunciado, código inicial e critério de aceite. |
| [`/ranking`](./src/app/ranking/page.tsx) | Módulo F (RF17) | Ranking público de poder dos personagens. |
| [`/salas`](./src/app/salas/page.tsx) | Módulo H (RF20) | Gestão de salas virtuais com modais de criação e ingresso por código. |
| [`/admin`](./src/app/admin/page.tsx) | Módulo J (RF22) | Painel com métricas agregadas do sistema. |
| [`/admin/auditoria`](./src/app/admin/auditoria/page.tsx) | Módulo G (RF18a) | Consulta e filtros no histórico inviolável de auditoria. |
| [`/admin/denuncias`](./src/app/admin/denuncias/page.tsx) | Módulo G (RF19a) | Painel de moderação para análise e deliberação. |
| [`/admin/usuarios`](./src/app/admin/usuarios/page.tsx) | Módulo J (RF23) | Suspensão e reativação administrativa de contas. |
| [`/esqueci-senha`](./src/app/esqueci-senha/page.tsx) | Módulo A (RF01a) | Fluxo de recuperação de senha com rate limit. |
| [`/redefinir-senha`](./src/app/redefinir-senha/page.tsx) | Módulo A (RF01a) | Troca de senha por token de uso único. |
| [`/verificar-email`](./src/app/verificar-email/page.tsx) | Módulo A (RF01c, RN12) | Aviso institucional de validação pendente de conta. |
| [`/termos`](./src/app/termos/page.tsx) | Módulo I (RF01f, RNF12) | Termos de Uso e Política de Privacidade em conformidade com a LGPD. |

---

## 3. Versionamento e Publicação (Git & GitHub)

O controle de versão foi rigorosamente mantido e sincronizado com o repositório remoto:

- **Repositório Remoto**: `https://github.com/suzalcantara2009/codequest-antigravity.git`
- **Branch Ativa**: `main`
- **Último Commit Registrado**:
  - **Hash:** `e0789f9c6b3f4942dbed5e062009cca1c7742ef3`
  - **Mensagem:** `feat: estrutura inicial do projeto e telas de autenticacao`
  - **Autor:** `PedroFMN`
  - **Volume:** 69 arquivos alterados, 10.693 adições.
- **Status do Repositório Local**:
  - `working tree clean` (nenhuma alteração pendente de commit ou push).
  - Sincronização validada com `git remote -v` e `git status`.

---

## 4. Status Atual e Próximos Passos

### 4.1 Resultado da Validação de Build (`npm run build`)
A compilação de produção do Next.js foi executada com **código de retorno 0** e zero falhas de compilação ou linter. Todas as **28 rotas** foram geradas com sucesso:

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    197 B          96.2 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ○ /admin                               197 B          96.2 kB
├ ○ /admin/auditoria                     197 B          96.2 kB
├ ○ /admin/denuncias                     197 B          96.2 kB
├ ○ /admin/usuarios                      197 B          96.2 kB
├ ƒ /api/auth/cadastro                   0 B                0 B
├ ƒ /api/auth/esqueci-senha              0 B                0 B
├ ƒ /api/auth/login                      0 B                0 B
├ ƒ /api/auth/logout                     0 B                0 B
├ ƒ /api/fichas                          0 B                0 B
├ ƒ /api/fichas/[id]                     0 B                0 B
├ ƒ /api/github/[username]               0 B                0 B
├ ○ /api/usuarios/exportar-dados         0 B                0 B
├ ƒ /api/webhooks/github                 0 B                0 B
├ ○ /cadastro                            4.58 kB         121 kB
├ ○ /esqueci-senha                       1.96 kB         105 kB
├ ○ /fichas                              2.95 kB         106 kB
├ ƒ /fichas/[id]                         3.57 kB         106 kB
├ ƒ /fichas/[id]/editar                  1.89 kB         105 kB
├ ○ /fichas/arquivadas                   1.75 kB         104 kB
├ ○ /fichas/nova                         2.31 kB         105 kB
├ ○ /login                               4.23 kB         121 kB
├ ○ /missoes                             1.82 kB        95.9 kB
├ ƒ /missoes/[id]                        197 B          96.2 kB
├ ○ /ranking                             142 B          87.4 kB
├ ○ /redefinir-senha                     1.85 kB         105 kB
├ ○ /salas                               3.3 kB         97.3 kB
├ ○ /termos                              142 B          87.4 kB
├ ○ /trilha                              197 B          96.2 kB
├ ƒ /trilha/[moduloId]                   197 B          96.2 kB
└ ○ /verificar-email                     197 B          96.2 kB
+ First Load JS shared by all            87.3 kB

✓ Generating static pages (28/28)
✓ Finalizing page optimization
✓ Collecting build traces
```

---

### 4.2 Checklist das Próximas Tarefas (Lógica de Negócios e Conexão de Dados)

- [ ] **Módulo A — Autenticação Completa com Banco de Dados**:
  - [ ] Implementar verificação de senha com `bcrypt.compare` na rota `/api/auth/login`.
  - [ ] Implementar persistência de usuário na tabela `usuarios` com verificação de e-mail pendente (**RN12**).
  - [ ] Criação de cookie seguro de sessão (`HttpOnly`, `Secure`, `SameSite=Strict`, validade de 7 dias e expiração por 30min de inatividade - **RN11**).
  - [ ] Implementar emissão e envio de token para verificação de e-mail (**RF01c**).
  - [ ] Implementar taxa de limite e disparo de e-mail de recuperação de senha (**RF01a**).
  - [ ] Implementar encerramento de sessão única e revogação de todas as sessões ativas (**RF01e**).
- [ ] **Módulo B & C — CRUD de Fichas e Regras de Negócio**:
  - [ ] Implementar inserção de ficha com transação garantindo a **RN06** (arquivamento de qualquer ficha ativa prévia na mesma operação).
  - [ ] Aplicar gravação automática e obrigatória na tabela `auditoria` a cada criação, edição, arquivamento e restauração (**RF18**).
  - [ ] Conectar formulário de `/fichas/nova` e tela de detalhes `/fichas/[id]`.
  - [ ] Conectar listagem `/fichas` com paginação (10 itens por página), ordenação e busca combinada de texto e universo (**RF07**, **RF08**).
- [ ] **Módulo D — Integração com a API do GitHub**:
  - [ ] Implementar chamada com timeout de 3 segundos e fallback tolerante a falhas (**RF11**, **RF12**).
  - [ ] Implementar persistência e revalidação no `github_cache` relacional (expiração de 1 hora).
  - [ ] Implementar limitação de 1 revalidação manual a cada 5 minutos por usuário (**RF12b**).
- [ ] **Módulo E — Trilha e Missões**:
  - [ ] Popular dados iniciais dos 4 módulos e missões do catálogo.
  - [ ] Implementar persistência de conclusão única de missão na tabela `missoes_concluidas` (**RF15**).
  - [ ] Validação de assinatura HMAC nos payloads de webhooks do GitHub (**RF15a**).
- [ ] **Módulo G, H & I — Moderação, Salas e Privacidade**:
  - [ ] Implementar envio e deliberação de denúncias por moderadores (**RF19**, **RF19a**).
  - [ ] Implementar criação e ingresso em salas virtuais de educadores (**RF20**).
  - [ ] Implementar exportação de dados pessoais em JSON para portabilidade LGPD (**RF21a**).
