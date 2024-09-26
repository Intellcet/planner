import md5 from 'md5';

import Db from '../db/Db';
import { convertToUser } from '../convertToEntities/convertToUser';

type UserManagerOptions = {
  db: Db;
};

class UserManager {
  private _db: Db;

  constructor(options: UserManagerOptions) {
    this._db = options.db;
  }

  async login(login: string, password: string) {
    const hash = md5(login + password);

    const userFromDb = await this._db.getUserByLogin(login);

    if (!userFromDb) return false;

    const user = convertToUser(userFromDb);

    if (user.password !== hash) return false;

    return user;
  }

  async registration(
    name: string,
    login: string,
    password: string,
    email: string
  ) {
    const isUserAlreadyExists = await this._db.getUserByLogin(login);

    if (isUserAlreadyExists) return false;

    const hash = md5(login + password);

    return this._db.addUser(name, login, hash, email);
  }
}

export default UserManager;
