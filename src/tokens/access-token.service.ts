import { Injectable } from '@nestjs/common';
import { TokenExpiryByType } from 'src/common/enums';
import { TokenPayload } from 'src/common/interfaces/token';
import { TokenService } from './token.service';
import { IAccessTokenService } from './interface';

@Injectable()
export class AccessTokenService implements IAccessTokenService {
  constructor(private readonly tokenService: TokenService) {}

  generate(payload: TokenPayload): string {
    return this.tokenService.generate(payload, TokenExpiryByType.ACCESS_TOKEN);
  }
}
