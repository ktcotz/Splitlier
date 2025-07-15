import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [AppConfigModule, PrismaModule, UserModule],
})
export class AppModule {}
