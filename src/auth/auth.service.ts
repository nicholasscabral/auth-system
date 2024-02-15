import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
} from 'src/common/interfaces/oauth-user';
import { getGithubPublicEmail } from 'src/common/utils/get-github-email';

@Injectable()
export class AuthService {
  googleLogin(req: Request, res: Response) {
    const user: GoogleOAuthUser = req.user as GoogleOAuthUser;

    console.log('google', { user });

    res.redirect(
      `http://localhost:3000/oauth-callback/google?email=${user.email}`,
    );
  }

  async githubLogin(req: Request, res: Response) {
    const user: GithubOAuthUser = req.user as GithubOAuthUser;

    const email = await getGithubPublicEmail(user.accessToken);

    res.redirect(`http://localhost:3000/oauth-callback/github?email=${email}`);
  }
}
