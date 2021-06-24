import express, { RequestHandler } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { Controller } from '../../types/controller.interface';
import { CreateShopDTO } from './dto/create-shop.dto';
import { ShopService } from './shop.service';
import { imageUpload } from '../../utils/uploadImg';
import { UpdateShopDTO } from './dto/update-shop.dto';

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
      imageUpload.single('image'),
      this.createShop,
    );
    this.router.delete(
      `${this.path}/delete/:id`,
      authMiddleware,
      this.deleteShop,
    );
    this.router.put(
      `${this.path}/edit/:id`,
      authMiddleware,
      imageUpload.single('image'),
      this.updateShop,
    );
    this.router.get(`${this.path}`, this.getAllShops);
    this.router.get(`${this.path}/:id`, this.getShop);
    this.router.get(
      `${this.path}/by/:ownerId`,
      authMiddleware,
      this.getShopByOwer,
    );
  };

  private createShop: RequestHandler = async (req, res, next) => {
    try {
      // const shopData: CreateShopDTO = JSON.parse(req.body.data);
      const shopData: CreateShopDTO = req.body;
      const image = req.file! && req.file.path!;
      const newShop = await this.shopService.create(image, shopData);

      res.status(200).json(newShop);
      next();
    } catch (err) {
      next(err);
    }
  };

  private getAllShops: RequestHandler = async (_, res, next) => {
    try {
      const shops = await this.shopService.getAll();
      res.status(200).json(shops);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: 'Could not get all Shops.',
      });
    }
  };

  private getShop: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const shop = await this.shopService.getById(id);
      if (shop) {
        const { id, image, ...other } = shop;
        res.status(200).json(other);
        next();
      }
    } catch (err) {
      next(err);
    }
  };

  private getShopByOwer: RequestHandler = async (req, res, next) => {
    try {
      const ownerId = req.params.ownerId;
      const shops = await this.shopService.findByOwner(ownerId);
      res.status(200).json(shops);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `{err}`,
      });
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

  private updateShop: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const image = req.file! && req.file.path!;
      const updateShopData: UpdateShopDTO = image
        ? { image, ...req.body }
        : req.body;
      const newShop = await this.shopService.update(id, updateShopData);
      res.status(200).json(newShop);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not update the shop ${err}.`,
      });
    }
  };
}
