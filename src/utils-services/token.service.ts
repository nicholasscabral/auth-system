// token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any, expiresIn: '1d' | '2h'): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  decode(token: string) {
    return this.jwtService.decode(token, { json: true });
  }

  verifyToken(token: string): object {
    const decodedPayload = this.jwtService.verify(token, {
      secret: config.jwtSecret,
      ignoreExpiration: true,
    });
    const isTokenExpired = decodedPayload.exp < Math.floor(Date.now() / 1000);

    return isTokenExpired ? null : decodedPayload;
  }
}
