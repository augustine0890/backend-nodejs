import express, { Request, Response } from 'express';
import { Application } from 'express-serve-static-core';
import { Controller } from './types/controller.interface';

const port = process.env.PORT || 3000;
export class App {
  private app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen(): void {
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }

  public test(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).send({ ok: true });
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}
