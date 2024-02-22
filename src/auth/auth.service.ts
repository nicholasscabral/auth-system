import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
  MicrosoftOAuthUser,
} from 'src/common/interfaces/oauth-user';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/utils-services/password.service';
import { TokenService } from 'src/utils-services/token.service';
import { LoginResponseDto } from './dtos/login-response';
import { TokenPayload } from 'src/common/interfaces/token';
import { Tokens } from 'src/common/interfaces/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login({ email, id }: User): Promise<LoginResponseDto> {
    const payload: TokenPayload = { sub: id, email };

    const tokens: Tokens = this.getTokens(payload);

    await this.tokenService.upsertRefreshToken(tokens.refreshToken, id);

    return tokens;
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

  async refresh(payload: TokenPayload): Promise<any> {
    const tokens: Tokens = this.getTokens(payload);

    await this.tokenService.upsertRefreshToken(
      tokens.refreshToken,
      payload.sub,
    );

    return tokens;
  }

  getTokens(payload: TokenPayload): Tokens {
    console.log({ payload });
    const accessToken: string = this.tokenService.generateAccessToken(payload);
    const refreshToken: string =
      this.tokenService.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }
}
