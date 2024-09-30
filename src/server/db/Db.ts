import sqlite3 from 'sqlite3';

import { UserRow } from '../types';

type DBOptions = {
  [dbName: string]: string;
};

class Db {
  private db: sqlite3.Database;

  constructor(options: DBOptions) {
    this.db = new sqlite3.Database(`${__dirname}/${options.dbName}`);
  }

  async getUserByLogin(login: string): Promise<UserRow | null> {
    return new Promise(resolve => {
      this.db.get(`SELECT * FROM user WHERE login=?`, [login], (err, row) => {
        if (!err) {
          resolve(row);
        }
        resolve(null);
      });
    });
  }
}

export default Db;
