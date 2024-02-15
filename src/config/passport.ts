import * as passport from 'passport';
import { GithubOAuthStrategy } from 'src/auth/strategies/github.strategy';
import { GoogleOauthStrategy } from 'src/auth/strategies/google.strategy';

export function initializePassport() {
  passport.use(new GoogleOauthStrategy());
  passport.use(new GithubOAuthStrategy());
}
