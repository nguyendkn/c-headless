export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  status: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
