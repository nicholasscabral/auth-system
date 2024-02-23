import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { EMAIL_VERIFICATION_PATH } from 'src/common/constans/routes';
import { VerifyEmailDto } from './dtos/verify';
import { AccountVerificationService } from './account-verification.service';
import { ResendEmailDto } from './dtos/resend';
import { Response } from 'express';
import { ServiceResponse } from 'src/common/interfaces/response';
import { config } from 'src/config/config';

@Controller(EMAIL_VERIFICATION_PATH)
export class AccountVerificationController {
  constructor(
    private readonly accountVerificationService: AccountVerificationService,
  ) {}

  @Get('verify')
  async verify(
    @Query(new ValidationPipe()) { token }: VerifyEmailDto,
    @Res() res: Response,
  ): Promise<any> {
    const emailVerified: ServiceResponse =
      await this.accountVerificationService.verifyEmail(token);

    const queryParams = !!emailVerified.success
      ? emailVerified.message
        ? `?message=${emailVerified.message}`
        : ''
      : `?error=true&message=${emailVerified.message}&token=${token}`;

    return res.redirect(`${config.clientUrl}/email-verification${queryParams}`);
  }

  @Post('resend')
  async resend(
    @Query(new ValidationPipe()) { token }: ResendEmailDto,
  ): Promise<any> {
    return this.accountVerificationService.resendVerificationLink(token);
  }
}
