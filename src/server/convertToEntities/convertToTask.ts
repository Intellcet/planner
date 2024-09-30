import { TaskRow } from '../types';

import Task from '../entities/task/Task';

export const convertToTask = (row: TaskRow): Task => {
  return new Task(
    row.id,
    row.creator,
    row.title,
    row.description,
    row.labels,
    row.participants,
    row.status,
    row.finishTime
  );
};
