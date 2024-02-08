import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { USERS_PATH } from 'src/common/constans/routes';
import { CreateUserDto } from './dto/create.dto';

@Controller(USERS_PATH)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) body: CreateUserDto): Promise<void> {
    return this.usersService.create(body);
  }
}
