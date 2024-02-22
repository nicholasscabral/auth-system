import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/common/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' } as IStrategyOptions);
  }

  async validate(email: string, password: string): Promise<any> {
    const user: User = await this.authService.validateUserLocal(
      email,
      password,
    );

    if (!user) throw new UnauthorizedException();

    if (!user.verified)
      throw new UnauthorizedException(
        'Please verify your account before trying to login',
      );

    return user;
  }
}
