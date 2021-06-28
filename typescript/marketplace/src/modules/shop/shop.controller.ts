import express, { RequestHandler } from 'express';
import { authenticatedMiddleware } from '../../middlewares/authenticated.middleware';
import { Controller } from '../../types/controller.interface';
import { CreateShopDTO } from './dto/create-shop.dto';
import { ShopService } from './shop.service';
import { imageUpload } from '../../utils/uploadImg';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { User } from '../auth/user.entity';
import { WrongAuthenticationTokenException } from '../../exceptions/WrongAuthenticationTokenException';

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
      authenticatedMiddleware,
      imageUpload.single('image'),
      this.createShop,
    );
    this.router.delete(
      `${this.path}/delete/:shopId`,
      authenticatedMiddleware,
      this.isOwner,
      this.deleteShop,
    );
    this.router.put(
      `${this.path}/edit/:shopId`,
      authenticatedMiddleware,
      imageUpload.single('image'),
      this.isOwner,
      this.updateShop,
    );
    this.router.get(`${this.path}`, this.getAllShops);
    this.router.get(`${this.path}/:shopId`, this.getShopById);
    this.router.get(
      `${this.path}/by/:ownerId`,
      authenticatedMiddleware,
      this.getShopByOwner,
    );
  };

  private createShop: RequestHandler = async (req, res, next) => {
    try {
      // const shopData: CreateShopDTO = JSON.parse(req.body.data);
      const shopData: CreateShopDTO = req.body;
      const image = req.file! && req.file.path!;
      const { id }: User = req.user;
      const newShop = await this.shopService.create(image, id, shopData);

      res.status(200).json(newShop);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `${err}.`,
      });
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

  private getShopById: RequestHandler = async (req, res, next) => {
    const id = req.params.shopId;
    try {
      const shop = await this.shopService.getById(id);
      if (shop) {
        const { id, image, ...other } = shop;
        res.status(200).json(other);
        next();
      }
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not retrieve the shop with #${id}. ${err}`,
      });
    }
  };

  private getShopByOwner: RequestHandler = async (req, res, next) => {
    try {
      const ownerId = req.params.ownerId;
      const shops = await this.shopService.findByOwner(ownerId);
      if (shops) {
        res.status(200).json(shops);
        next();
      }
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `${err}`,
      });
    }
  };

  private isOwner: RequestHandler = async (req, res, next) => {
    const { id }: User = req.user;
    const shopId = req.params.shopId;
    const ownerId = await this.shopService.getOwner(shopId);
    const isOwner = ownerId === id;

    if (!isOwner) {
      res.status(403).json({
        error: true,
        message: 'User is not authorized.',
      });
      next(new WrongAuthenticationTokenException());
    }
    next();
  };

  private deleteShop: RequestHandler = async (req, res, next) => {
    const shopId = req.params.shopId;
    try {
      await this.shopService.delete(shopId);
      res.status(200).json({ success: true });
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not delete the shop with #${shopId}. ${err}`,
      });
    }
  };

  private updateShop: RequestHandler = async (req, res, next) => {
    const shopId = req.params.shopId;
    try {
      const image = req.file! && req.file.path!;
      const updateShopData: UpdateShopDTO = image
        ? { image, ...req.body }
        : req.body;
      const newShop = await this.shopService.update(shopId, updateShopData);
      res.status(200).json(newShop);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not edit the shop with #${shopId}. ${err}.`,
      });
    }
  };
}
