class Status {
  private _id?: number | undefined;

  private _name?: string | undefined;

  constructor(id: number | undefined, name: string | undefined) {
    this._id = id;
    this._name = name;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }
}

export default Status;
