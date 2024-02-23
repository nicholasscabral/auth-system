import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { GithubAuthGuard } from './guards/github.guard';
import { MicrosoftAuthGuard } from './guards/microsoft.guard';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
  MicrosoftOAuthUser,
} from 'src/common/interfaces/oauth-user';
import { User } from 'src/common/entities';
import { TokenPayload } from 'src/common/interfaces/token';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ResetPasswordDto } from './dtos/reset-password';
import { ResetPasswordTokenGuard } from './guards/reset-password-token.guard';
import { ForgotPasswordDto } from './dtos/forgot-password';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async localLogin(@Req() req: Request) {
    return this.authService.login(req.user as User);
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

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Req() req: Request) {
    return this.authService.refresh(req.user as TokenPayload);
  }

  @Post('forgot-password')
  async forgotPassword(@Body(new ValidationPipe()) body: ForgotPasswordDto) {
    console.log({ body });
    // send reset password email
  }

  @Get('forgot-password/callback/:token')
  @UseGuards(ResetPasswordTokenGuard)
  async forgotPasswordCallback(@Res() res: Response) {
    return res.redirect(''); // reset password page
  }

  @Post('reset-password/:token')
  @UseGuards(ResetPasswordTokenGuard)
  async resetPassword(
    @Body(new ValidationPipe()) body: ResetPasswordDto,
    @Req() req: Request,
  ) {
    console.log({ body, req });
    // reset password
  }
}
