import { User } from '@/types/user';

export type Session = Omit<User, 'password' | 'refreshToken'>;
