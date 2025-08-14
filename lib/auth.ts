import { Session } from '../shared/types/session';
import { generateToken, verifyToken } from './jwt';

import bcrypt from 'bcrypt';

export const generateAccessToken = (payload: Session): string => {
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not set');
  }

  if (!process.env.JWT_ACCESS_TOKEN_EXPIRATION) {
    throw new Error('ACCESS_TOKEN_EXPIRATION is not set');
  }

  return generateToken(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    process.env.JWT_ACCESS_TOKEN_EXPIRATION
  );
};

export const generateRefreshToken = (payload: Session): string => {
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error('JWT_REFRESH_TOKEN_SECRET is not set');
  }

  if (!process.env.JWT_REFRESH_TOKEN_EXPIRATION) {
    throw new Error('JWT_REFRESH_TOKEN_EXPIRATION is not set');
  }

  return generateToken(
    payload,
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    process.env.JWT_REFRESH_TOKEN_EXPIRATION
  );
};

export const generateTwoFactorToken = (payload: Session): string => {
  if (!process.env.JWT_TWO_FACTOR_TOKEN_SECRET) {
    throw new Error('JWT_TWO_FACTOR_TOKEN_SECRET is not set');
  }

  if (!process.env.JWT_TWO_FACTOR_TOKEN_EXPIRATION) {
    throw new Error('JWT_TWO_FACTOR_TOKEN_EXPIRATION is not set');
  }

  return generateToken(
    payload,
    process.env.JWT_TWO_FACTOR_TOKEN_SECRET as string,
    process.env.JWT_TWO_FACTOR_TOKEN_EXPIRATION
  );
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const verifyAccessToken = (token: string) => {
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not set');
  }

  return verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

export const verifyTwoFactorToken = (token: string) => {
  if (!process.env.JWT_TWO_FACTOR_TOKEN_SECRET) {
    throw new Error('JWT_TWO_FACTOR_TOKEN_SECRET is not set');
  }

  return verifyToken(token, process.env.JWT_TWO_FACTOR_TOKEN_SECRET);
};
