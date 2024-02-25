import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ResetPasswordEmailService } from 'src/email/reset-password-email.service';
import { config } from 'src/config/config';
import { ResetPasswordTokenService } from 'src/tokens/reset-password-token.service';
import { UsersService } from 'src/users/users.service';
import { HashAndSalt } from 'src/common/interfaces/password';
import { User } from 'src/common/entities';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly resetPasswordTokenService: ResetPasswordTokenService,
    private readonly resetPasswordEmailService: ResetPasswordEmailService,
  ) {}

  async forgot(email: string): Promise<void> {
    // verify is user exists
    const userExists: User = await this.userService.findByEmail(email);

    if (!userExists) return;

    // create unique token
    const token: string = this.resetPasswordTokenService.generate({
      email,
      sub: userExists.id,
    });

    await this.resetPasswordTokenService.upsert(token, userExists.id);

    // create reset link
    const resetLink: string = `${config.callbacks.resetPassword}/${token}`;

    console.log({ token, resetLink });

    // send email
    this.resetPasswordEmailService.send(email, resetLink);
  }

  forgotCallback(token: string): string {
    return `${config.clientRedirects.resetPassword}?token=${token}`;
  }

  async reset(email: string, password: string): Promise<void> {
    // hash the password
    const hashAndSalt: HashAndSalt = await this.passwordService.hashPassword(
      password,
    );

    // change the password
    await this.userService.changePassword(email, hashAndSalt);

    // delete reset password record
    await this.resetPasswordTokenService.delete(email);

    // send confirmation email
    this.resetPasswordEmailService.sendConfirmation(email);
  }
}
