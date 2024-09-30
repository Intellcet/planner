import User from '../user/User';

class Comment {
  private _id: number | string;

  private _author: User;

  private _taskId: number | string;

  private _text: string;

  constructor(
    id: number | string,
    author: User,
    taskId: number | string,
    text: string
  ) {
    this._id = id;
    this._author = author;
    this._taskId = taskId;
    this._text = text;
  }

  get id(): number | string {
    return this._id;
  }

  set id(value: number | string) {
    this._id = value;
  }

  get author(): User {
    return this._author;
  }

  set author(value: User) {
    this._author = value;
  }

  get taskId(): number | string {
    return this._taskId;
  }

  set taskId(value: number | string) {
    this._taskId = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }
}

export default Comment;
