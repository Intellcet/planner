import Db from '../db/Db';
import { CommentRow, CommentSimpleRow } from '../types';
import User from '../entities/user/User';
import Comment from '../entities/comment/Comment';
import { convertToComment } from '../convertToEntities/convertToComment';

type CommentManagerOptions = {
  db: Db;
};

class CommentManager {
  private db: Db;

  constructor(options: CommentManagerOptions) {
    this.db = options.db;
  }

  async createComment(
    authorId: number | string,
    taskId: number | string,
    text: string
  ) {
    return this.db.addComment(authorId, taskId, text);
  }

  async getListOfComments(
    taskId: number | string
  ): Promise<CommentSimpleRow[] | null> {
    return this.db.getListOfComments(taskId);
  }

  addAuthorsToComments(
    authors: User[],
    commentsRow: CommentSimpleRow[]
  ): Comment[] {
    return commentsRow.map((commentSimpleRow, idx) => {
      const commentRow: CommentRow = {
        author: authors[idx],
        text: commentSimpleRow.text,
        taskId: commentSimpleRow.task_id,
        id: commentSimpleRow.id,
      };
      return convertToComment(commentRow);
    });
  }
}

export default CommentManager;
