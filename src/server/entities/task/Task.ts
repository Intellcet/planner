import User from '../user/User';
import Status from '../status/Status';

class Task {
  private _id: number | undefined;

  private _creator: User | undefined;

  private _participants: User[] = [];

  private _status: Status | undefined;

  private _title: string | undefined;

  private _description: string | undefined;

  private _labels: string[] = [];

  private _finishTime: Date | string | undefined;

  constructor(
    id: number,
    creator: User,
    title: string,
    description: string,
    labels: string[],
    participants: User[],
    status: Status,
    finishTime: Date | string
  ) {
    this._id = id;
    this._creator = creator;
    this._title = title;
    this._description = description;
    this._labels = labels;
    this._participants = participants;
    this._status = status;
    this._finishTime = finishTime;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get creator(): User | undefined {
    return this._creator;
  }

  set creator(value: User | undefined) {
    this._creator = value;
  }

  get participants(): User[] {
    return this._participants;
  }

  set participants(value: User[]) {
    this._participants = value;
  }

  get status(): Status | undefined {
    return this._status;
  }

  set status(value: Status | undefined) {
    this._status = value;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(value: string | undefined) {
    this._title = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get labels(): string[] {
    return this._labels;
  }

  set labels(value: string[]) {
    this._labels = value;
  }

  get finishTime(): Date | string | undefined {
    return this._finishTime;
  }

  set finishTime(value: Date | string | undefined) {
    this._finishTime = value;
  }
}

export default Task;
