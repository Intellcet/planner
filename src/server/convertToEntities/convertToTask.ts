import Task from '../entities/task/Task';

type TaskRow = {
  id: number;
  creatorId: number;
  statusId: number;
  title: string;
  description: string;
  labels: string[];
  finishTime: string;
};

export const convertToTask = (row: TaskRow): Task => {
  return new Task(
    row.id,
    row.title,
    row.description,
    row.labels,
    row.finishTime
  );
};
