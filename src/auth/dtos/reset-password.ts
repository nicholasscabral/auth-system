import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class ResetPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Password should match' })
  passwordConfirm: string;
}
