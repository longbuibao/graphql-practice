import DataLoader from 'dataloader';
import { User } from '@prisma/client';

import { BatchUser } from '../types';
import { prisma } from '..';

const batchUser: BatchUser = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const userMap = users.reduce((result: { [key: string]: User }, current) => {
    result[current.id] = current;
    return result;
  }, {});

  return ids.map((id) => userMap[id]);
};

export const userLoader = new DataLoader<number, User>(batchUser);
