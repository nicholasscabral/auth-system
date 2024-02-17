import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('adfasdfadfasdfasdf');
    const validUser = await this.authService.validateUser(email, password);

    console.log({ validUser });

    // if (!validUser) throw new UnauthorizedException();

    return validUser;
  }
}
