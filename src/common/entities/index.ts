export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface User {
  id: number;
  email: string;
  name?: string;
  hash?: string;
  salt?: string;
  role: UserRole;
  verified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  refreshTokens?: RefreshToken[];
  resetPasswordTokens?: ResetPasswordToken[];
}

export interface RefreshToken {
  id: number;
  user: User;
  userId: number;
  token: string;
  expiresAt: string | Date;
  createdAt: string | Date;
}

export interface ResetPasswordToken {
  id: number;
  user: User;
  userId: number;
  token: string;
  expiresAt: string | Date;
  createdAt: string | Date;
}
