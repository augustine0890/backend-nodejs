import { HttpException } from './HttpException';

export class EmailOrUsernameInUseExcepton extends HttpException {
  constructor() {
    super(400, `Email or username already taken`);
  }
}
