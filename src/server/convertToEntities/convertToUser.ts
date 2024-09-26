import User from '../entities/user/User';

type UserRow = {
  id: number;
  login: string;
  password: string;
  name: string;
  email?: string;
};

export const convertToUser = (row: UserRow): User => {
  return new User(row.id, row.login, row.password, row.name, row.email);
};
