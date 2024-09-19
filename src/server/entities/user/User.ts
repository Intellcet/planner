class User {
  private _id: number;

  private _name: string;

  private _login: string;

  private _password: string;

  private _email?: string | undefined;

  constructor(
    id: number,
    name: string,
    login: string,
    password: string,
    email: string | undefined
  ) {
    this._id = id;
    this._name = name;
    this._login = login;
    this._password = password;
    this._email = email;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }
}

export default User;
