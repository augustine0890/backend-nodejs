import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { Controller } from '../../types/controller.interface';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { LoginUserDTO } from './dto/login-user.dto';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { HttpException } from '../../exceptions/HttpException';
import { UpdateUserDTO } from './dto/update-user.dto';

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
      .get('/user/:id', this.getUserById)
      .patch('/user', authMiddleware, this.updateUser)
      .delete(this.path, authMiddleware, this.deleteUser)
      .get('/users', this.getAllUsers)
      .post(`${this.path}/encrypt`, this.encryptPayload)
      .post(`${this.path}/decrypt`, this.decryptPayload);
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

  private getUserById: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await this.authService.get(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  private updateUser: RequestHandler = async (
    req,
    res,
    next,
  ): Promise<void> => {
    const updateData: UpdateUserDTO = req.body;
    const { id }: User = req.user;
    try {
      await this.authService.update(id, updateData);
      const updatedUser = await this.authService.get(id);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  private deleteUser = async (
    { user: { id } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.authService.deleteUser(id);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  private getCurrentUser = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { id, username, seller }: User = req.user;
    res.status(200).json({ id, username, seller });
  };

  private getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await this.authService.getAllUser();
    res.status(200).send(users);
  };

  private encryptPayload = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      let { payload } = req.body;
      payload = JSON.stringify(payload);
      const data = await this.authService.encryptData(payload);
      res.send(data);
      next();
    } catch (err) {
      console.error(err);
      throw new HttpException(500, 'Something goes wrong');
    }
  };

  private decryptPayload = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { encrypted, hmac } = req.body;
      const decrypted = await this.authService.decryptData(encrypted, hmac);
      if (typeof decrypted === 'string') {
        const payload = JSON.parse(decrypted);
        // console.log(payload.seq_user_game);
        // console.log(parseInt(payload.seq_nft_info, 10));
        // console.log(payload.code);
        // console.log(payload.seq_item_game);
        // console.log(JSON.stringify(payload.attribute));
        res.status(200).send(payload);
        next();
      } else {
        next('Decrypted is an empty.');
      }
    } catch (err) {
      console.error(err);
      throw new HttpException(500, 'Something goes wrong');
    }
  };
}
