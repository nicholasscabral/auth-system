import { Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { EMAIL_VERIFICATION_PATH } from 'src/common/constans/routes';
import { VerifyEmailDto } from './dtos/verify';
import { EmailVerificationService } from './email-verification.service';
import { ResendEmailDto } from './dtos/resend';

@Controller(EMAIL_VERIFICATION_PATH)
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Get('verify')
  async verify(
    @Query(new ValidationPipe()) { token }: VerifyEmailDto,
  ): Promise<any> {
    return this.emailVerificationService.verifyEmail(token);
  }

  @Post('resend')
  async resend(
    @Query(new ValidationPipe()) { token }: ResendEmailDto,
  ): Promise<any> {
    return this.emailVerificationService.resendVerificationLink(token);
  }
}
