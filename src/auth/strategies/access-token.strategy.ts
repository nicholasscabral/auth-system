import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { TokenPayload } from 'src/common/interfaces/token';
import { config } from 'src/config/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    } as StrategyOptions);
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}
