import { LoggerService as NestLoggerService } from '@nestjs/common';
export abstract class IPasswordService {
  abstract hashPassword(
    password: string,
  ): Promise<{ hash: string; salt: string }>;

  abstract compareHash(
    password: string,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean>;
}

export abstract class ILoggerService implements NestLoggerService {
  abstract log(message: string, context?: string): void;
  abstract error(message: string, trace: string, context?: string): void;
  abstract warn(message: string, context?: string): void;
  abstract debug(message: string, context?: string): void;
  abstract verbose(message: string, context?: string): void;
}
