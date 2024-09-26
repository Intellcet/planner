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
      const query = `SELECT * FROM user WHERE login=?`;

      this.db.get(query, [login], (err, row) => {
        if (!err) {
          resolve(row);
        }
        resolve(null);
      });
    });
  }

  async addUser(name: string, login: string, password: string, email: string) {
    return new Promise(resolve => {
      const query = `INSERT INTO user (name, login, password, email) VALUES (?, ?, ?, ?)`;

      this.db.run(query, [name, login, password, email], err => {
        if (!err) resolve(true);
        resolve(false);
      });
    });
  }
}

export default Db;
