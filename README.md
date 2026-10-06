# CodeQuest ⚔️💻

> Plataforma web gamificada que transforma a prática de programação em uma progressão de RPG verificável com fichas de personagens, missões pedagógicas e atividade do GitHub.

Projeto baseado nas especificações completas de arquitetura, banco de dados (DER), requisitos funcionais/não-funcionais e regras de negócio presentes no [`spec.md`](./spec.md).

---

## 🛠️ Stack Tecnológica

- **Framework Full-Stack**: [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com paleta RPG/Quest e [Lucide React](https://lucide.dev/)
- **Camada de Dados & ORM**: [PostgreSQL](https://www.postgresql.org/) (compatível com Neon Serverless) via [Prisma ORM](https://www.prisma.io/) e suporte a *prepared statements*
- **Validação de Schemas**: [Zod](https://zod.dev/) para validação rigorosa no cliente e no servidor
- **Segurança & Criptografia**: `bcryptjs` (RNF01: custo ≥ 10), cookies `HttpOnly`/`Secure`/`SameSite=Strict`, HMAC para webhooks e cabeçalhos de segurança HTTP (RNF14, RNF15)
- **Hospedagem & CI/CD**: Vercel com deploy contínuo na branch `main`

---

## 📁 Estrutura de Pastas

```text
codequest-antigravity/
├── prisma/
│   └── schema.prisma         # Schema relacional completo com mapeamento PostgreSQL
├── sql/
│   └── schema.sql            # DDL SQL puro com restrições CHECK e índices parciais
├── src/
│   ├── app/                  # App Router do Next.js
│   │   ├── (auth)/
│   │   │   ├── login/        # RF01a - Login por e-mail/senha
│   │   │   ├── cadastro/     # RF01a, RF01f - Cadastro com termos LGPD
│   │   │   ├── esqueci-senha/# RF01a - Solicitação de reset com rate limit
│   │   │   ├── redefinir-senha/
│   │   │   ├── verificar-email/ # RF01c, RN12 - Confirmação de e-mail
│   │   │   └── termos/       # Termos de Uso e Política de Privacidade LGPD
│   │   ├── fichas/           # Módulo B e C - Personagens
│   │   │   ├── nova/         # RF02, RF03, RF04 - Criação de ficha com universos
│   │   │   ├── [id]/         # RF11, RF12 - Detalhes e métricas do GitHub
│   │   │   ├── [id]/editar/  # Edição de personagem
│   │   │   └── arquivadas/   # RF06, RF09 - Visualização e restauração de fichas
│   │   ├── trilha/           # Módulo E - Trilha pedagógica em 4 módulos
│   │   │   └── [moduloId]/
│   │   ├── missoes/          # Catálogo de missões com filtros por dificuldade
│   │   │   └── [id]/
│   │   ├── ranking/          # Módulo F - Ranking público de poder
│   │   │   └── salas/        # Módulo H - Salas de aula para professores e turmas
│   │   ├── admin/            # Módulo J e G - Gestão e auditoria
│   │   │   ├── auditoria/    # RF18, RF18a - Log inviolável
│   │   │   ├── denuncias/    # RF19, RF19a - Moderação
│   │   │   └── usuarios/     # RF23 - Suspensão e reativação
│   │   ├── api/              # API Route Handlers
│   │   │   ├── auth/         # Rotas de autenticação
│   │   │   ├── fichas/       # CRUD e arquivamento de fichas
│   │   │   ├── github/       # Proxy e cache das métricas do GitHub
│   │   │   ├── webhooks/     # Validação HMAC de webhooks do GitHub (RF15a)
│   │   │   └── usuarios/     # Portabilidade de dados LGPD (RF21a)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/           # Componentes modulares e reutilizáveis
│   │   ├── layout/           # Navbar, Footer
│   │   └── ui/               # Button, Input, Modal (RI02), Toast (RI09), Pagination (RI10)...
│   ├── lib/                  # Utilitários e configurações de servidor
│   │   ├── auth.ts           # Hash bcrypt e gerenciamento de sessões
│   │   ├── audit.ts          # Registro de auditoria inviolável
│   │   ├── db.ts             # Instância singleton do Prisma Client
│   │   ├── github.ts         # Integração com API GitHub (timeout 3s e cache)
│   │   ├── rate-limit.ts     # Controle de requisições por IP e janela de tempo
│   │   ├── utils.ts          # Utilitários de classes e formatação
│   │   └── validations/      # Schemas Zod (auth, ficha, missão, denúncia, sala)
│   └── types/                # Definições de tipos TypeScript
├── .env.example              # Documentação das variáveis de ambiente necessárias
├── next.config.mjs           # Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options)
├── tailwind.config.ts        # Configurações de tema e cores
├── tsconfig.json             # Configuração TypeScript com alias @/*
└── package.json              # Dependências e scripts do projeto
```

---

## 🚀 Como Iniciar o Projeto

### 1. Clonar e Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo e preencha as variáveis:
```bash
cp .env.example .env
```

### 3. Sincronizar o Banco de Dados
Gere o cliente do Prisma e sincronize o schema com seu banco PostgreSQL (Neon ou local):
```bash
npm run db:generate
npm run db:push
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.
