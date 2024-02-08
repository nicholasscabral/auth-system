import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Passwords should match' })
  passwordConfirm: string;
}
