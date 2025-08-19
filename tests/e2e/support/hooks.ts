import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { CustomWorld } from './custom-world';
import { runSeeders } from './../../../prisma/seed';
import { PrismaService } from './../../../src/prisma/prisma.service';

let prismaService: PrismaService;
let app: INestApplication;

BeforeAll(async function () {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  prismaService = app.get(PrismaService);

  await runSeeders(prismaService);
});

AfterAll(async function () {
  if (app) await app.close();

  await prismaService.$disconnect();
});

Before(async function (this: CustomWorld) {
  this.app = app;

  await prismaService.$executeRaw`BEGIN`;
});

After(async function () {
  await prismaService.$executeRaw`ROLLBACK`;
  this.response = undefined;
});
