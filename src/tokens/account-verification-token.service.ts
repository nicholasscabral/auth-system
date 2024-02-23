import { Injectable } from '@nestjs/common';
import { TokenExpiryByType } from 'src/common/enums';
import { TokenPayload } from 'src/common/interfaces/token';
import { TokenService } from './token.service';
import { IAccountVerificationTokenService } from './interface';
import { VerifyEmailToken } from 'src/common/interfaces/verify-email-token';

@Injectable()
export class AccountVerificationTokenService
  implements IAccountVerificationTokenService
{
  constructor(private readonly tokenService: TokenService) {}

  generate(payload: TokenPayload): string {
    return this.tokenService.generate(
      payload,
      TokenExpiryByType.ACCOUNT_VERIFICATION,
    );
  }

  verify(token: string, ignoreExpiration?: boolean): VerifyEmailToken {
    return this.tokenService.verify(token, ignoreExpiration);
  }
}
