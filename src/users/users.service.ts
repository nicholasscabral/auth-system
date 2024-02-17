import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { PrismaService } from 'src/providers/database/prisma.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { PasswordService } from 'src/utils-services/password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  async create({ email, password }: CreateUserDto) {
    const userAlreadyExists = await this.prisma.tB_USERS.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException({ error: 'Email already in use' });
    }

    const { hash, salt } = await this.passwordService.hashPassword(password);

    const user = await this.prisma.tB_USERS.create({
      data: { email: email, hash, salt },
    });

    this.emailVerificationService.sendVerificationLink(user.email);
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.tB_USERS.findUnique({ where: { email } });
  }
}
