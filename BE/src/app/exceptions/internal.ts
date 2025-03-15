import { HttpException } from "./Root";

class InternalException extends HttpException {
  constructor(message: string, errorCode = null, errors = null) {
    super(message, errorCode, 500, errors);
  }
}
export default InternalException;
