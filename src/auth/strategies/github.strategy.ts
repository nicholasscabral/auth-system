import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { GithubOAuthUser } from 'src/common/interfaces/oauth';
import { getGithubPublicEmail } from 'src/common/utils/get-github-email';
import { config } from 'src/config/config';

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super(config.oauth.github);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    const user: GithubOAuthUser = {
      sub: profile.id,
      name: profile.displayName,
      email: await getGithubPublicEmail(accessToken),
      accessToken,
    };
    console.log('github', { user });
    done(null, user);
  }
}
