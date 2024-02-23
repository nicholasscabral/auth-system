import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities';
import {
  GithubOAuthUser,
  GoogleOAuthUser,
  MicrosoftOAuthUser,
} from 'src/common/interfaces/oauth';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/utils-services/password.service';
import { LoginResponseDto } from './dtos/login-response';
import { TokenPayload } from 'src/common/interfaces/token';
import { Tokens } from 'src/common/interfaces/token';
import { RefreshTokenService } from 'src/tokens/refresh-token.service';
import { AccessTokenService } from 'src/tokens/access-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async login({ email, id }: User): Promise<LoginResponseDto> {
    const payload: TokenPayload = { sub: id, email };

    const tokens: Tokens = this.getTokens(payload);

    await this.refreshTokenService.upsert(tokens.refreshToken, id);

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

    await this.refreshTokenService.upsert(tokens.refreshToken, payload.sub);

    return tokens;
  }

  getTokens(payload: TokenPayload): Tokens {
    return {
      accessToken: this.accessTokenService.generate(payload),
      refreshToken: this.refreshTokenService.generate(payload),
    };
  }
}
