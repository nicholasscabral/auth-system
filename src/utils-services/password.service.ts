import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordService } from './interfaces';
import { HashAndSalt } from 'src/common/interfaces/password';

@Injectable()
export class PasswordService implements IPasswordService {
  async hashPassword(password: string): Promise<HashAndSalt> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password + salt, 10);
    return { salt, hash };
  }

  async compareHash(
    password: string,
    hashsedPassword: string,
    salt: string,
  ): Promise<boolean> {
    if (!password || !hashsedPassword || !salt) return false;
    return bcrypt.compare(password + salt, hashsedPassword);
  }
}
