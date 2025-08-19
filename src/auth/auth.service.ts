import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { AUTH_MESSAGES } from './constants/auth-constants';
import * as bcrypt from 'bcrypt';
import { JWTService } from './../jwt/jwt.service';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  async register({ email, password, ...rest }: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException(AUTH_MESSAGES.USER_EXIST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
      ...rest,
    });

    const { password: _, ...safeUser } = newUser;

    return {
      ...safeUser,
    };
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const tokens = await this.jwtService.generateTokens({
      email,
      sub: String(user.id),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 10);

    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    const { password: _, refreshToken: __, ...safeUser } = user;

    return {
      ...tokens,
      ...safeUser,
    };
  }
}
