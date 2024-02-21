import { Injectable } from '@nestjs/common';
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
import { TokenExpiryByType } from 'src/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: LoggedUser): Promise<LoginResponseDto> {
    return {
      accessToken: this.tokenService.generateToken(
        { email: user.email },
        TokenExpiryByType.accessToken,
      ),
    };
  }

  async googleLogin(user: GoogleOAuthUser) {
    const userFromOauth: User = await this.userService.upsertOAuthUser(user);
    return this.login(userFromOauth);
  }

  async githubLogin(user: GithubOAuthUser) {
    const userFromOauth: User = await this.userService.upsertOAuthUser(user);
    return this.login(userFromOauth);
  }

  async microsoftLogin(user: MicrosoftOAuthUser) {
    const userFromOauth: User = await this.userService.upsertOAuthUser(user);
    return this.login(userFromOauth);
  }

  async validateUserLocal(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const passwordsMatch: boolean = await this.passwordService.compareHash(
      password,
      user.hash,
      user.salt,
    );

    if (!passwordsMatch) return null;

    delete user.hash;
    delete user.salt;
    return user;
  }
}
