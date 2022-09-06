import jwt from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../keys';

export const getUserFromToken = (token: string | undefined) => {
  try {
    if (token)
      return jwt.verify(token, JWT_SIGNATURE) as {
        userId: number;
      };
    return null;
  } catch (error) {
    return null;
  }
};
