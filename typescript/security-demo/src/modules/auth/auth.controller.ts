import express, { Request, Response, NextFunction } from 'express';
import { Controller } from '../../types/controller.interface';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { authMiddleware } from '../../middlewares/auth.middleware';

export class AuthController implements Controller {
  public path = 'auth';
  public router = express.Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router
      .post(`${this.path}/signup`, this.signUp)
      .get(this.path, authMiddleware, this.getCurrentUser);
  };

  private signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userData: CreateUserDTO = req.body;

    try {
      const authData = await this.authService.signUp(userData);
      res.status(200).json(authData);
    } catch (err) {
      next(err); // allow errorMiddleware to handle catched error, throw default exception
    }
  };

  private getCurrentUser = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { id, username }: User = req.user;
    res.status(200).json({ id, username });
  };
}
