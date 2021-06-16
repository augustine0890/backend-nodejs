export default class Messenger {
  port: number;

  constructor(port:number) {
    this.port = port
  }

  messagePrint() {
    return `Node and Express server is running on poat ${this.port}`;
  }
}