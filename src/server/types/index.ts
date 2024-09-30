import User from '../entities/user/User';
import Status from '../entities/status/Status';
import Task from '../entities/task/Task';

export type CommentSimpleRow = {
  id: number;
  author_id: number;
  task_id: number;
  text: string;
};

export type CommentRow = {
  id: number;
  author: User;
  taskId: string | number;
  text: string;
};

export type StatusRow = {
  id: number;
  name: string;
};

export type TaskSimpleRow = {
  id: number;
  creator_id: number;
  status_id: number;
  title: string;
  description: string;
  labels: string;
  participants: string;
  finish_time: string;
};

export type TaskRow = {
  id: number;
  creator: User;
  status: Status;
  title: string;
  description: string;
  labels: string[];
  participants: User[];
  finishTime: string;
};

export type UserRow = {
  id: number;
  login: string;
  password: string;
  name: string;
  email?: string;
};
