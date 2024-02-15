import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { config } from 'src/config/config';

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super(config.oauth.github);
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): any {
    const user = {
      name: profile.name,
      accessToken: accessToken,
    };
    done(null, user);
  }
}
