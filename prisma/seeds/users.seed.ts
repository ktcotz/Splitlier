import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export default async function seedUsers(prisma: PrismaClient) {
  const password = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'test@splittly.pl' },
    update: {},
    create: {
      email: 'test@splittly.pl',
      password,
    },
  });

  console.log('👤 Seed: test user created');
}
