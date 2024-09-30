import { UserRow } from '../types';

import User from '../entities/user/User';

export const convertToUser = (row: UserRow): User => {
  return new User(row.id, row.name, row.login, row.password, row.email);
};
