import { HttpException } from "./Root";

class UnauthoredException extends HttpException {
  constructor(message: string, errorCode: number, errors = null) {
    super(message, errorCode, 401, errors);
  }
}
export default UnauthoredException;
