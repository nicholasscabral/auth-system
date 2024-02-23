import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { TokenPayload } from 'src/common/interfaces/token';
import { config } from 'src/config/config';
import { ResetPasswordTokenService } from 'src/tokens/reset-password-token.service';

@Injectable()
export class ResetPasswordTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset-password',
) {
  constructor(
    private readonly resetPasswordTokenService: ResetPasswordTokenService,
  ) {
    super({
      secretOrKey: config.jwtSecret,
      passReqToCallback: true,
    } as StrategyOptions);
  }

  async validate(
    @Req() req: Request,
    { email, sub }: TokenPayload,
  ): Promise<TokenPayload> {
    const resetPasswordToken: string = req.params.token;

    if (!resetPasswordToken) {
      throw new ForbiddenException('Reset password token is required');
    }

    const tokenIsValid: boolean = await this.resetPasswordTokenService.validate(
      resetPasswordToken,
    );

    if (!tokenIsValid) {
      throw new ForbiddenException('Reset Password Token expired');
    }

    return { email, sub };
  }
}
