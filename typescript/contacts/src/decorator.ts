function messagePrint(target) {
  Object.defineProperty(target.protype, 'server', {value: () => 'Node server is running'})
}

@messagePrint
export default class Message {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}