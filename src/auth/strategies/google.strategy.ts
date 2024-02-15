import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'src/config/config';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super(config.oauth.google);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
      sub: profile.id,
      accessToken,
    };
    done(null, user);
  }
}
