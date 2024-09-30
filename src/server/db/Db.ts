import sqlite3 from 'sqlite3';

import { StatusRow, TaskSimpleRow, UserRow } from '../types';

type DBOptions = {
  [dbName: string]: string;
};

const TASK_UPDATE_KEYS_MAPPER = {
  status: 'status_id',
  title: 'title',
  description: 'description',
  labels: 'labels',
  participants: 'participants',
  finishTime: 'finish_time',
};

type TaskUpdateKeys = keyof typeof TASK_UPDATE_KEYS_MAPPER;

class Db {
  private db: sqlite3.Database;

  constructor(options: DBOptions) {
    this.db = new sqlite3.Database(`${__dirname}/${options.dbName}`);
  }

  async getStatus(id: string | number): Promise<StatusRow | null> {
    return new Promise(resolve => {
      const query = `SELECT * FROM status WHERE id=?`;

      this.db.get(query, [id], (err, row) => {
        if (err) resolve(null);

        resolve(row);
      });
    });
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

  async getUserById(id: string | number): Promise<UserRow | null> {
    return new Promise(resolve => {
      const query = `SELECT * FROM user WHERE id=?`;

      this.db.get(query, [id], (err, row) => {
        if (err) resolve(null);

        resolve(row);
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

  async addTask(
    creatorId: number,
    statusId: number,
    title: string,
    description: string,
    labels: string[],
    participants: number[],
    finishTime: string | null
  ) {
    return new Promise(resolve => {
      // eslint-disable-next-line max-len
      const query = `INSERT INTO task (creator_id, status_id, title, description, labels, participants, finish_time) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      this.db.run(
        query,
        [
          creatorId,
          statusId,
          title,
          description,
          labels.length !== 0 ? JSON.stringify(labels) : '',
          participants.length !== 0 ? JSON.stringify(participants) : '',
          finishTime,
        ],
        function(err) {
          if (err) resolve(false);

          resolve(this.lastID);
        }
      );
    });
  }

  async getTask(taskId: number): Promise<TaskSimpleRow | null> {
    return new Promise(resolve => {
      const query = `SELECT * FROM task WHERE id=?`;

      this.db.get(query, [taskId], (err, row) => {
        if (err) resolve(null);

        resolve(row);
      });
    });
  }

  async updateTask(options: any): Promise<boolean> {
    return new Promise(resolve => {
      let subQuery = '';

      Object.entries(options).forEach(value => {
        if (value[0] === 'id') return;

        const [key, val] = value as [TaskUpdateKeys, any];

        subQuery +=
          TASK_UPDATE_KEYS_MAPPER[key] + ' = ' + JSON.stringify(val) + ', ';
      });

      const query = `UPDATE task SET ${subQuery.substring(
        0,
        subQuery.length - 2
      )} WHERE id=?`;

      this.db.run(query, [options.id], err => {
        resolve(!err);
      });
    });
  }

  async removeTask(id: number | string): Promise<boolean> {
    return new Promise(resolve => {
      const query = 'DELETE FROM task WHERE id=?';

      this.db.run(query, [id], err => {
        resolve(!err);
      });
    });
  }
}

export default Db;
