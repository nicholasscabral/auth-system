import { IsJWT, IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
