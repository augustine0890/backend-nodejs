import express, { RequestHandler } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { Controller } from '../../types/controller.interface';
import { User } from '../auth/user.entity';
import { CreateShopDTO } from './dto/create-shop.dto';
import { ShopService } from './shop.service';
import { imageUpload } from '../../utils/uploadImg';

export class ShopController implements Controller {
  public path = '/shops';
  public router = express.Router();
  private shopService = new ShopService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.post(
      `${this.path}/create`,
      authMiddleware,
      imageUpload.single('image'),
      this.createShop,
    );
    this.router.delete(
      `${this.path}/delete/:id`,
      authMiddleware,
      this.deleteShop,
    );
    this.router.get(`${this.path}`, this.getAllShops);
  };

  private createShop: RequestHandler = async (req, res, next) => {
    try {
      // const shopData: CreateShopDTO = JSON.parse(req.body.data);
      const shopData: CreateShopDTO = req.body;
      const image = req.file && req.file.path;
      const { id }: User = req.user;
      const newShop = await this.shopService.create(id, image, shopData);

      res.status(200).json(newShop);
      next();
    } catch (err) {
      next(err);
    }
  };

  private getAllShops: RequestHandler = async (req, res, next) => {
    try {
      const shops = await this.shopService.getAll();
      res.status(200).json(shops);
    } catch (err) {
      next(err);
    }
  };

  private deleteShop: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      await this.shopService.delete(id);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };
}
