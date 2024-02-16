import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { MicrosoftOAuthUser } from 'src/common/interfaces/oauth-user';
import { config } from 'src/config/config';

@Injectable()
export class MicrosoftOAuthStrategy extends PassportStrategy(
  Strategy,
  'microsoft',
) {
  constructor() {
    super(config.oauth.microsoft);
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const user: MicrosoftOAuthUser = {
      name: profile.displayName,
      email: profile.emails[0].value,
      sub: profile.id,
      accessToken,
    };
    done(null, user);
  }
}