import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runSeeders() {
  await import('./seeds/users.seed').then((s) => s.default(prisma));
}

runSeeders()
  .then(() => {
    console.log('✅ Seeding complete');
  })
  .catch((e) => {
    console.error('❌ Seeding failed', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
