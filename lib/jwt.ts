import { Session } from '@/shared/types';
import { sign, SignOptions, verify } from 'jsonwebtoken';

export const generateToken = <T extends object | string>(
  payload: T,
  secret: string,
  expiresIn: string | number | undefined
) => {
  if (expiresIn === undefined) {
    return sign(payload, secret);
  }

  return sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (
  token: string,
  secret: string
): Promise<Session> => {
  return new Promise((resolve, reject) => {
    try {
      verify(token, secret, (err, decoded) => {
        if (err || !decoded) {
          return reject(err);
        }
        const decodedParser = decoded as Session;
        const session: Session = {
          id: decodedParser.id,
          email: decodedParser.email,
          name: decodedParser.name,
        };
        resolve(session);
      });
    } catch (err) {
      reject(err);
    }
  });
};
