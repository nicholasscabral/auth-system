import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { GithubAuthGuard } from './guards/github.guard';
import { MicrosoftAuthGuard } from './guards/microsoft.guard';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
  LoggedUser,
  MicrosoftOAuthUser,
} from 'src/common/interfaces/oauth-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async localLogin(@Req() req: Request) {
    const user: LoggedUser = req.user as LoggedUser;
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request) {
    return this.authService.googleLogin(req.user as GoogleOAuthUser);
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubLogin(): void {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Req() req: Request) {
    return this.authService.githubLogin(req.user as GithubOAuthUser);
  }

  @Get('microsoft')
  @UseGuards(MicrosoftAuthGuard)
  microsoftLogin(): void {}

  @Get('microsoft/callback')
  @UseGuards(MicrosoftAuthGuard)
  async microsoftCallback(@Req() req: Request) {
    return this.authService.microsoftLogin(req.user as MicrosoftOAuthUser);
  }
}
