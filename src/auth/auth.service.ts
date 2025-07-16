import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  async register(createUserDto: CreateUserDto) {
    return { message: 'User registered', user: createUserDto };
  }

  async login(loginUserDto: LoginUserDto) {
    return { message: 'User logged in', user: loginUserDto };
  }
}
