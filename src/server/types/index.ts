export type StatusRow = {
  id: number;
  name: string;
};

export type TaskRow = {
  id: number;
  creatorId: number;
  statusId: number;
  title: string;
  description: string;
  labels: string[];
  finishTime: string;
};

export type UserRow = {
  id: number;
  login: string;
  password: string;
  name: string;
  email?: string;
};
