import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as dotenv from 'dotenv';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
    const envPath = path.resolve(process.cwd(), envFile);
    const envConfig = dotenv.config({ path: envPath }).parsed;

    super({
      datasources: {
        db: {
          url: envConfig?.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
