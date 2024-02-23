import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { TokenExpiryByType } from 'src/common/enums';
import { TokenPayload } from 'src/common/interfaces/token';
import { ITokenService } from './interface';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(payload: TokenPayload, expiresIn: TokenExpiryByType): string {
    return this.jwtService.sign(payload, {
      expiresIn,
      secret: config.jwtSecret,
    });
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }

  verify(token: string, ignoreExpiration?: boolean): any {
    try {
      const decodedPayload = this.jwtService.verify(token, {
        secret: config.jwtSecret,
        ignoreExpiration: true,
      });
      const isTokenExpired = decodedPayload.exp < Math.floor(Date.now() / 1000);

      return isTokenExpired && !ignoreExpiration ? null : decodedPayload;
    } catch (e) {
      return null;
    }
  }
}
