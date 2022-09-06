import validator from 'validator';
import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Context, SignupArgs, UserPayload } from '../../types';
import { JWT_SIGNATURE } from '../../keys';

export const AuthResolvers = {
  signup: async (_: any, args: SignupArgs, { prisma }: Context): Promise<UserPayload> => {
    const isEmail = validator.isEmail(args.email);
    const isPasswordOk = validator.isLength(args.password, { min: 6 });
    const isUsernameOk = validator.isLength(args.name, { min: 6 });

    if (!isEmail || !isPasswordOk || !isUsernameOk) {
      return {
        userErrors: [{ message: 'Invalid Input, check again' }],
        token: null,
      };
    }
    try {
      const hashedPassword = await brcypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          password: hashedPassword,
        },
      });

      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: user.id,
        },
      });

      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SIGNATURE,
        { expiresIn: '100d' }
      );

      return { userErrors: [], token };
    } catch (error) {
      return {
        userErrors: [error],
        token: null,
      };
    }
  },
};
