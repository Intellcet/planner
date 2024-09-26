import { TaskRow } from '../types';

import Task from '../entities/task/Task';

export const convertToTask = (row: TaskRow): Task => {
  return new Task(
    row.id,
    row.title,
    row.description,
    row.labels,
    row.participants,
    row.finishTime
  );
};
