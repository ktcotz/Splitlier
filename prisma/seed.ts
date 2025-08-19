// runSeeders.ts
import { PrismaService } from './../src/prisma/prisma.service';

export async function runSeeders(prisma: PrismaService) {
  await import('./seeds/users.seed').then((s) => s.default(prisma));
}

if (require.main === module) {
  const prisma = new PrismaService();
  runSeeders(prisma)
    .then(() => console.log('✅ Seeding complete'))
    .catch((e) => {
      console.error('❌ Seeding failed', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
