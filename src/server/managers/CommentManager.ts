import Db from '../db/Db';

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
}

export default CommentManager;
