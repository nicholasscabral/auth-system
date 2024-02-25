import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { PrismaService } from 'src/providers/database/prisma.service';
import { AccountVerificationService } from 'src/account-verification/account-verification.service';
import { PasswordService } from 'src/utils-services/password.service';
import { OAuthUser } from 'src/common/interfaces/oauth';
import { User } from 'src/common/entities';
import { HashAndSalt } from 'src/common/interfaces/password';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly accountVerificationService: AccountVerificationService,
  ) {}

  async create({ email, password }: CreateUserDto): Promise<void> {
    const userAlreadyExists = await this.prisma.users.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException({ error: 'Email already in use' });
    }

    const { hash, salt } = await this.passwordService.hashPassword(password);

    const user = await this.prisma.users.create({
      data: { email: email, hash, salt },
    });

    this.accountVerificationService.init(user.email);
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async upsertOAuthUser({ email }: OAuthUser): Promise<User> {
    const userAlreadyExists: User = (await this.prisma.users.findUnique({
      where: { email },
    })) as User;

    // TODO; enviar um email para definir senha

    return (userAlreadyExists ||
      this.prisma.users.create({ data: { email } })) as User;
  }

  async changePassword(
    email: string,
    { hash, salt }: HashAndSalt,
  ): Promise<void> {
    await this.prisma.users.update({
      where: { email },
      data: { hash, salt },
    });
  }
}
