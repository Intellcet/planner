import sqlite3 from 'sqlite3';

type DBOptions = {
  [dbName: string]: string;
};

class Db {
  private db: sqlite3.Database;

  constructor(options: DBOptions) {
    this.db = new sqlite3.Database(`${__dirname}/${options.dbName}`);
  }
}

export default Db;
