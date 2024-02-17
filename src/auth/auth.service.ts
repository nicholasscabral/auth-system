import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
  MicrosoftOAuthUser,
} from 'src/common/interfaces/oauth-user';
import { getGithubPublicEmail } from 'src/common/utils/get-github-email';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/utils-services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
  ) {}

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

  async microsoftLogin(req: Request, res: Response) {
    const user: MicrosoftOAuthUser = req.user as MicrosoftOAuthUser;

    console.log('microsoft', { user });

    res.redirect(
      `http://localhost:3000/oauth-callback/microsoft?email=${user.email}`,
    );
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const passwordsMatch: boolean = await this.passwordService.compareHash(
      password,
      user.hash,
      user.salt,
    );

    if (!passwordsMatch) return null;

    return user;
  }
}
