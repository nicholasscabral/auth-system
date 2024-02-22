import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { TokenPayload } from 'src/common/interfaces/token';
import { config } from 'src/config/config';
import { TokenService } from 'src/utils-services/token.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly tokenService: TokenService) {
    super({
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      passReqToCallback: true,
    } as StrategyOptions);
  }

  async validate(
    @Req() req: Request,
    { email, sub }: TokenPayload,
  ): Promise<TokenPayload> {
    const refreshToken: string = req.body.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not provided');
    }

    const tokenIsValid: boolean = await this.tokenService.validateRefreshToken(
      refreshToken,
    );

    if (!tokenIsValid) {
      throw new ForbiddenException('Refresh Token expired');
    }

    return { email, sub };
  }
}
