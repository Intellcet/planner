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
}

export default UserManager;
