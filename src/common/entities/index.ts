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
}
