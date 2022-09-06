import validator from 'validator';
import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Context, SignupArgs, UserPayload } from '../../types';
import { JWT_SIGNATURE } from '../../keys';

export const AuthResolvers = {
  signup: async (_: any, args: SignupArgs, { prisma }: Context): Promise<UserPayload> => {
    const isEmail = validator.isEmail(args.credential.email);
    const isPasswordOk = validator.isLength(args.credential.password, { min: 6 });
    const isUsernameOk = validator.isLength(args.name, { min: 6 });

    if (!isEmail || !isPasswordOk || !isUsernameOk) {
      return {
        userErrors: [{ message: 'Invalid Input, check again' }],
        token: null,
      };
    }
    try {
      const hashedPassword = await brcypt.hash(args.credential.password, 10);
      const user = await prisma.user.create({
        data: {
          email: args.credential.email,
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
  signin: async (_: any, { credential }: SignupArgs, { prisma }: Context): Promise<UserPayload> => {
    try {
      const { email, password } = credential;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return {
          token: null,
          userErrors: [{ message: 'Not found this email' }],
        };
      }

      const isMatch = await brcypt.compare(password, user.password);
      if (!isMatch) {
        return {
          token: null,
          userErrors: [{ message: 'Bad credentials' }],
        };
      }

      return {
        token: jwt.sign({ userId: user.id }, JWT_SIGNATURE),
        userErrors: [],
      };
    } catch (error) {
      return {
        token: null,
        userErrors: [error],
      };
    }
  },
};
