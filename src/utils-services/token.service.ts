// token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { ITokenService } from './interfaces';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any, expiresIn: '1d' | '2h'): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  decode(token: string): any {
    return this.jwtService.decode(token, { json: true });
  }

  verifyToken(token: string): any {
    const decodedPayload = this.jwtService.verify(token, {
      secret: config.jwtSecret,
      ignoreExpiration: true,
    });
    const isTokenExpired = decodedPayload.exp < Math.floor(Date.now() / 1000);

    return isTokenExpired ? null : decodedPayload;
  }
}
