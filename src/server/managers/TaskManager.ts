// TODO:: remove later
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { isNil, omitBy } from 'lodash';

import { TaskRow, TaskSimpleRow, UserRow } from '../types';
import Db from '../db/Db';
import User from '../entities/user/User';
import Task from '../entities/task/Task';
import { convertToTask } from '../convertToEntities/convertToTask';
import { convertToUser } from '../convertToEntities/convertToUser';
import { convertToStatus } from '../convertToEntities/convertToStatus';

type TaskManagerOptions = {
  db: Db;
};

type UpdateTaskOptions = {
  id: number;
  status: number | null;
  title: string | null;
  description: string | null;
  labels: string[] | null;
  finishTime: string | null;
  participants: string[] | null;
};

class TaskManager {
  private _db: Db;

  constructor(options: TaskManagerOptions) {
    this._db = options.db;
  }

  async convertSimpleTaskToTask(
    simpleTask: TaskSimpleRow
  ): Promise<Task | null> {
    const participants: string[] =
      simpleTask.participants.length > 0
        ? JSON.parse(simpleTask.participants)
        : [];

    const taskLabels: string[] =
      simpleTask.labels.length > 0 ? JSON.parse(simpleTask.labels) : [];

    const participantsUsers: User[] = [];
    const userRowPromises: Promise<UserRow | null>[] = [];

    participants.forEach(el => {
      if (!el) return;

      userRowPromises.push(this._db.getUserById(el));
    });

    const userRows = await Promise.all(userRowPromises);

    userRows.forEach(row => {
      if (!row) return;

      const user = convertToUser(row);

      participantsUsers.push(user);
    });

    const taskCreatorRow = await this._db.getUserById(simpleTask.creator_id);
    const statusRow = await this._db.getStatus(simpleTask.status_id);

    if (!taskCreatorRow) return null;
    if (!statusRow) return null;

    const taskCreator = convertToUser(taskCreatorRow);
    const taskStatus = convertToStatus(statusRow);

    const taskRow: TaskRow = {
      id: simpleTask.id,
      creator: taskCreator,
      status: taskStatus,
      participants: participantsUsers,
      description: simpleTask.description,
      finishTime: simpleTask.finish_time,
      title: simpleTask.title,
      labels: taskLabels,
    };

    return convertToTask(taskRow);
  }

  async createTask(
    creatorId: number,
    statusId: number,
    title: string,
    description: string,
    labels: string[],
    participants: number[],
    finishTime: string | null
  ) {
    const taskId = await this._db.addTask(
      creatorId,
      statusId,
      title,
      description,
      labels,
      participants,
      finishTime
    );

    if (!taskId) return false;

    return taskId;
  }

  async getTask(id: number): Promise<Task | null> {
    const taskSimpleRow = await this._db.getTask(id);

    if (!taskSimpleRow) return null;

    return this.convertSimpleTaskToTask(taskSimpleRow);
  }

  async getTasks(taskSimpleRows: TaskSimpleRow[]) {
    const taskSimpleRowsPromises: Promise<Task | null>[] = [];

    taskSimpleRows.forEach(el => {
      taskSimpleRowsPromises.push(this.convertSimpleTaskToTask(el));
    });

    const nullableTasks = await Promise.all(taskSimpleRowsPromises);
    const tasks: Task[] = [];

    nullableTasks.forEach(el => {
      if (el) {
        tasks.push(el);
      }
    });

    return tasks;
  }

  async updateTask(options: UpdateTaskOptions): Promise<boolean> {
    const nonEmptyOptions = omitBy(options, isNil);
    const result = await this._db.updateTask(nonEmptyOptions);

    return result;
  }

  async deleteTask(id: number | string): Promise<boolean> {
    return this._db.removeTask(id);
  }

  async getListOfTasks(limit: number, offset: number): Promise<Task[]> {
    const taskSimpleRows = await this._db.getListOfTasks(limit, offset);

    return this.getTasks(taskSimpleRows);
  }

  async getCountTasks(): Promise<number | null> {
    return this._db.getCountOfAllTasks();
  }

  async searchTasks(searchStr: string): Promise<Task[]> {
    const taskSimpleRows = await this._db.getListOfTasksByPattern(searchStr);

    return this.getTasks(taskSimpleRows);
  }
}

export default TaskManager;
