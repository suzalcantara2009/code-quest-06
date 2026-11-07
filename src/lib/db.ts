import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Sempre armazena a instância no globalThis para reutilização de conexões em ambientes serverless (Vercel/Neon)
globalForPrisma.prisma = prisma;

export default prisma;
