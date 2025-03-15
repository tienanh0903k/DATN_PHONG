class HttpException extends Error {
  public errorCode: any;
  public statusCode: any;
  public errors: any;

  constructor(message: string, errorCode: any, statusCode: any, errors: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorCode = {
  User_Not_Found: 1001,
  User_Already_Exist: 1002,
  Incoreact_Password: 1003,
  UNPROCESSABLE_ENTITY: 2001,
  INTERNAL_EXCEPTION: 3001,
  UNAUTHORIZED: 401,
};

export { HttpException, errorCode };
