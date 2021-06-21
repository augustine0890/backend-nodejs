import express, { Request, Response, NextFunction } from 'express';
import { Controller } from '../../types/controller.interface';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { LoginUserDTO } from './dto/login-user.dto';
import { validationMiddleware } from '../../middlewares/validation.middleware';

export class AuthController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router
      .post(
        `${this.path}/signup`,
        validationMiddleware(CreateUserDTO),
        this.signUp,
      )
      .post(
        `${this.path}/signin`,
        validationMiddleware(LoginUserDTO),
        this.signIn,
      )
      .get(this.path, authMiddleware, this.getCurrentUser)
      .delete(this.path, authMiddleware, this.deleteAccount)
      .get('/users', this.getAllUsers);
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

  private signIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const loginData: LoginUserDTO = req.body;

    try {
      const authData = await this.authService.signIn(loginData);
      res.status(200).json(authData);
    } catch (err) {
      next(err);
    }
  };

  private deleteAccount = async (
    { user: { id } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.authService.deleteAccount(id);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  private getCurrentUser = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { id, username }: User = req.user;
    res.status(200).json({ id, username });
  };

  private getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const users = await this.authService.getAllAccount();
    res.status(200).send(users);
  }
}
