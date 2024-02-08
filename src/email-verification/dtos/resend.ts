import { IsJWT, IsNotEmpty } from 'class-validator';

export class ResendEmailDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
