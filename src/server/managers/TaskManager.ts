import { cloneDeep } from 'lodash';
import Db from '../db/Db';
import { convertToTask } from '../convertToEntities/convertToTask';
import User from '../entities/user/User';
import { convertToUser } from '../convertToEntities/convertToUser';
import { TaskRow, UserRow } from '../types';
import { convertToStatus } from '../convertToEntities/convertToStatus';
import Task from '../entities/task/Task';

type TaskManagerOptions = {
  db: Db;
};

class TaskManager {
  private _db: Db;

  constructor(options: TaskManagerOptions) {
    this._db = options.db;
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

    const participants: string[] =
      taskSimpleRow.participants.length > 0
        ? JSON.parse(taskSimpleRow.participants)
        : [];

    const taskLabels: string[] =
      taskSimpleRow.labels.length > 0 ? JSON.parse(taskSimpleRow.labels) : [];

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

    const taskCreatorRow = await this._db.getUserById(taskSimpleRow.creator_id);
    const statusRow = await this._db.getStatus(taskSimpleRow.status_id);

    if (!taskCreatorRow) return null;
    if (!statusRow) return null;

    const taskCreator = convertToUser(taskCreatorRow);
    const taskStatus = convertToStatus(statusRow);

    const taskRow: TaskRow = {
      id: taskSimpleRow.id,
      creator: taskCreator,
      status: taskStatus,
      participants: participantsUsers,
      description: taskSimpleRow.description,
      finishTime: taskSimpleRow.finish_time,
      title: taskSimpleRow.title,
      labels: taskLabels,
    };

    return convertToTask(taskRow);
  }
}

export default TaskManager;
