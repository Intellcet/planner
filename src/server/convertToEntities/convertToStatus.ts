import { StatusRow } from '../types';

import Status from '../entities/status/Status';

export const convertToStatus = (row: StatusRow): Status => {
  return new Status(row.id, row.name);
};
