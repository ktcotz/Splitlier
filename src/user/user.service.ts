import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return {
      users: [],
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
