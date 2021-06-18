import 'dotenv/config';

import { App } from './app';

(async (): Promise<void> => {
  const app = new App();
  app.listen();
  app.test();
})();