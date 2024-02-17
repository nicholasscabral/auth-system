import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordService } from './interfaces';

@Injectable()
export class PasswordService implements IPasswordService {
  async hashPassword(
    password: string,
  ): Promise<{ salt: string; hash: string }> {
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
    const comparationHash = await bcrypt.hash(password + salt, 10);
    console.log(comparationHash, hashsedPassword);
    return comparationHash === hashsedPassword;
  }
}
