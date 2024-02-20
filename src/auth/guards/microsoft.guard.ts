import { AuthGuard } from '@nestjs/passport';

export class MicrosoftAuthGuard extends AuthGuard('microsoft') {}
