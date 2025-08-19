import * as bcrypt from 'bcrypt';
import { PrismaService } from './../../src/prisma/prisma.service';

export default async function seedUsers(prisma: PrismaService) {
  const passwordHash = await bcrypt.hash('MySecretPass123!', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'alice.doe@example.com',
        password: passwordHash,
      },
      {
        email: 'bob.smith@example.com',
        password: passwordHash,
      },
    ],
    skipDuplicates: true,
  });
}
