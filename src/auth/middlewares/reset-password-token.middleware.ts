import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenPayload } from 'src/common/interfaces/token';
import { ResetPasswordTokenService } from 'src/tokens/reset-password-token.service';

@Injectable()
export class ResetPasswordTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly resetPasswordTokenService: ResetPasswordTokenService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const factory = createMiddlewareFactory(this.resetPasswordTokenService);
    return factory(req, res, next);
  }
}

export const createMiddlewareFactory = (
  resetPasswordTokenService: ResetPasswordTokenService,
) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    const token: string = req.params.token;

    if (!token) {
      throw new ForbiddenException('Invalid token');
    }

    const verifiedToken: TokenPayload =
      await resetPasswordTokenService.validate(token);

    console.log({ verifiedToken });

    if (!verifiedToken) {
      throw new ForbiddenException('Invalid token');
    }

    req['user'] = verifiedToken;
    next();
  };
};
