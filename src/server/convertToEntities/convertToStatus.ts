import Status from '../entities/status/Status';

type StatusRow = {
  id: number;
  name: string;
};

export const convertToStatus = (row: StatusRow): Status => {
  return new Status(row.id, row.name);
};
