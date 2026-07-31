import { PrismaClient } from '@prisma/client';

/**
 * Prisma singleton. Persistence is OPTIONAL: when DATABASE_URL is unset the
 * planner still runs and delivers leads by email + CRM, it just skips the DB
 * write (see persistEstimate). This keeps local/preview environments working
 * without a database and matches the "delivery must never block" rule.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const dbEnabled = !!process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
