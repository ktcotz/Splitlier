import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './../auth/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@Body() createUserDTO: CreateUserDto) {
    return this.userService.createUser(createUserDTO);
  }
}
