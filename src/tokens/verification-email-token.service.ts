import { Injectable } from '@nestjs/common';
import { TokenExpiryByType } from 'src/common/enums';
import { TokenPayload } from 'src/common/interfaces/token';
import { TokenService } from './token.service';
import { IVerificationEmailTokenService } from './interface';

@Injectable()
export class VerificationEmailTokenService
  implements IVerificationEmailTokenService
{
  constructor(private readonly tokenService: TokenService) {}

  generate(payload: TokenPayload): string {
    return this.tokenService.generate(
      payload,
      TokenExpiryByType.VERIFICATION_EMAIL,
    );
  }
}
