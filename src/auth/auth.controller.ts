import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Res,
  Param,
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
} from 'src/common/interfaces/oauth';
import { User } from 'src/common/entities';
import { TokenPayload } from 'src/common/interfaces/token';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ResetPasswordDto, ResetPasswordTokenDto } from './dtos/reset-password';
import { ForgotPasswordDto } from './dtos/forgot-password';
import { ResetPasswordService } from 'src/utils-services/reset-password.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

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
  async forgotPassword(
    @Body(new ValidationPipe()) { email }: ForgotPasswordDto,
  ) {
    // send reset password email
    return this.resetPasswordService.forgot(email);
  }

  @Get('forgot-password/callback/:token')
  async forgotPasswordCallback(
    @Param() { token }: ResetPasswordTokenDto,
    @Res() res: Response,
  ) {
    // redirect to reset password page
    const redirectUrl: string = this.resetPasswordService.forgotCallback(token);
    console.log({ redirectUrl });
    res.redirect(redirectUrl);
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body(new ValidationPipe()) { password }: ResetPasswordDto,
    @GetUser() user: User,
  ) {
    return this.resetPasswordService.reset(user.email, password);
  }
}
