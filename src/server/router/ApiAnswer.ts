type ApiError = {
  [errorNum: number]: string;
};

class ApiAnswer {
  static answer = (data: any) => {
    return { result: 'ok', data };
  };

  static errors: ApiError = {
    1000: 'not enough parameters',
    2000: 'error with trying add to DB',
    2001: 'user with this login already exists',
    2002: 'not enough parameters',
    2010: 'incorrect login data',
    3010: 'cannot create task',
    3020: 'task is not exists',
    3030: 'cannot update task',
    3040: 'cannot delete task',
    4010: 'cannot create comment',
    4020: 'cannot get list of comments',
    401: 'not authorized',
    402: 'invalid authorized token',
    404: 'element not found',
    9000: 'unknown error',
  };

  static error = (code: number) => {
    const error = ApiAnswer.errors[code] || ApiAnswer.errors[9000];
    return { result: 'error', error };
  };
}

export default ApiAnswer;
