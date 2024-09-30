import { CommentRow } from '../types';

import Comment from '../entities/comment/Comment';

export const convertToComment = (row: CommentRow): Comment => {
  return new Comment(row.id, row.author, row.taskId, row.text);
};
