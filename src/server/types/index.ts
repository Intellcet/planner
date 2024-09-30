import User from '../entities/user/User';
import Status from '../entities/status/Status';

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
