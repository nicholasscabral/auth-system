import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/common/entities';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
  LoggedUser,
  MicrosoftOAuthUser,
} from 'src/common/interfaces/oauth-user';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/utils-services/password.service';
import { TokenService } from 'src/utils-services/token.service';
import { LoginResponseDto } from './dtos/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: LoggedUser): Promise<LoginResponseDto> {
    return {
      accessToken: this.tokenService.generateToken({ email: user.email }, '7d'),
    };
  }

  async googleLogin(req: Request, res: Response) {
    const user: GoogleOAuthUser = req.user as GoogleOAuthUser;

    console.log('google', { user });

    res.redirect(
      `http://localhost:3000/oauth-callback/google?email=${user.email}`,
    );
  }

  async githubLogin(req: Request, res: Response) {
    const user: GithubOAuthUser = req.user as GithubOAuthUser;

    console.log('github', { user });

    res.redirect(
      `http://localhost:3000/oauth-callback/github?email=${user.email}`,
    );
  }

  async microsoftLogin(req: Request, res: Response) {
    const user: MicrosoftOAuthUser = req.user as MicrosoftOAuthUser;

    console.log('microsoft', { user });

    res.redirect(
      `http://localhost:3000/oauth-callback/microsoft?email=${user.email}`,
    );
  }

  async validateUserLocal(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const passwordsMatch: boolean = await this.passwordService.compareHash(
      password,
      user.hash,
      user.salt,
    );

    // return error if the user is not verified

    if (!passwordsMatch) return null;

    delete user.hash;
    delete user.salt;
    return user;
  }
}
