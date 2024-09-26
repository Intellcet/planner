import Db from '../db/Db';

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
    labels: number[],
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
}

export default TaskManager;
