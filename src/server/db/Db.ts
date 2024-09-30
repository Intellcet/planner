import sqlite3 from 'sqlite3';

import { CommentSimpleRow, StatusRow, TaskSimpleRow, UserRow } from '../types';

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

  async addComment(
    authorId: number | string,
    taskId: number | string,
    text: string
  ) {
    return new Promise(resolve => {
      const query =
        'INSERT INTO comment (author_id, task_id, text) VALUES(?, ?, ?)';

      this.db.run(query, [authorId, taskId, text], err => {
        resolve(!err);
      });
    });
  }

  async getListOfComments(
    taskId: number | string
  ): Promise<CommentSimpleRow[] | null> {
    return new Promise(resolve => {
      const query = 'SELECT * FROM comment WHERE task_id=?';

      this.db.all(query, [taskId], (err, rows) => {
        if (err) resolve(null);

        resolve(rows);
      });
    });
  }

  async getListOfTasks(
    limit: number,
    offset: number
  ): Promise<TaskSimpleRow[]> {
    return new Promise(resolve => {
      const query = 'SELECT * FROM task LIMIT ? OFFSET ?';

      this.db.all(query, [limit, offset], (err, rows) => {
        if (err) resolve([]);

        resolve(rows);
      });
    });
  }

  async getCountOfAllTasks(): Promise<number | null> {
    return new Promise(resolve => {
      const query = "SELECT COUNT(*) as 'count' FROM task";

      this.db.get(query, (err, row) => {
        if (err) resolve(null);

        resolve(row.count);
      });
    });
  }

  async getListOfTasksByPattern(pattern: string): Promise<TaskSimpleRow[]> {
    return new Promise(resolve => {
      const query = `SELECT * FROM task WHERE title LIKE '%${pattern}%'`;

      this.db.all(query, (err, rows) => {
        if (err) resolve([]);

        resolve(rows);
      });
    });
  }

  async getListOfUsersByPattern(pattern: string): Promise<UserRow[]> {
    return new Promise(resolve => {
      const query = `SELECT * FROM user WHERE name LIKE '%${pattern}%'`;

      this.db.all(query, (err, rows) => {
        if (err) resolve([]);

        resolve(rows);
      });
    });
  }

  async getListOfUsers(limit: number, offset: number): Promise<UserRow[]> {
    return new Promise(resolve => {
      const query = 'SELECT * FROM user LIMIT ? OFFSET ?';

      this.db.all(query, [limit, offset], (err, rows) => {
        if (err) resolve([]);

        resolve(rows);
      });
    });
  }

  async getCountOfAllUsers(): Promise<number | null> {
    return new Promise(resolve => {
      const query = "SELECT COUNT(*) as 'count' FROM user";

      this.db.get(query, (err, row) => {
        if (err) resolve(null);

        resolve(row.count);
      });
    });
  }
}

export default Db;
