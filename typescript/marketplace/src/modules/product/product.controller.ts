import express, { RequestHandler } from 'express';
import { authenticatedMiddleware } from '../../middlewares/authenticated.middleware';
import { authorizedMiddleware } from '../../middlewares/authorized.middleware';
import { Controller } from '../../types/controller.interface';
import { imageUpload } from '../../utils/uploadImg';
import { CreateProductDTO } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-product.dto';
import { ProductService } from './product.service';

export class ProductController implements Controller {
  public path = '/products';
  public router = express.Router();
  private productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.post(
      `${this.path}/create/:shopId`,
      authenticatedMiddleware,
      imageUpload.single('image'),
      this.createProduct,
    );
    this.router.get(`${this.path}`, this.getAllProducts);
    this.router.get(`${this.path}/by/:shopId`, this.getProductByShop);
    this.router.delete(
      `${this.path}/delete/:productId`,
      authenticatedMiddleware,
      authorizedMiddleware,
      this.deleteProduct,
    );
    // this.router.get(`${this.path}/latest?`, this.getProductsLatest);
    this.router.get(`${this.path}/:productId`, this.getProductById);
  };

  private createProduct: RequestHandler = async (req, res, next) => {
    try {
      const productData: CreateProductDTO = req.body;
      const image = req.file! && req.file.path!;
      const shopId = req.params.shopId;
      const newProduct = await this.productService.create(
        shopId,
        image,
        productData,
      );

      res.status(200).json(newProduct);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `${err}.`,
      });
    }
  };

  private getAllProducts: RequestHandler = async (req, res, next) => {
    try {
      const { page, latest }: GetAllProductsDTO = req.query;
      const products = await this.productService.getAll(page, latest);
      res.status(200).json(products);
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not get all Products. ${err}`,
      });
    }
  };

  private getProductById: RequestHandler = async (req, res, next) => {
    const id = req.params.productId;
    try {
      const product = await this.productService.getById(id);
      if (product) {
        res.status(200).json(product);
        next();
      }
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not retrieve the product with #${id}. ${err}`,
      });
      throw new Error(err);
    }
  };

  private getProductByShop: RequestHandler = async (req, res, next) => {
    try {
      const shopId = req.params.shopId;
      const products = await this.productService.findByShop(shopId);
      if (products) {
        res.status(200).json(products);
        next();
      }
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `${err}`,
      });
      throw new Error(err);
    }
  };

  private deleteProduct: RequestHandler = async (req, res, next) => {
    const productId = req.params.productId;
    try {
      await this.productService.delete(productId);
      res.status(200).json({ success: true });
      next();
    } catch (err) {
      res.status(400).json({
        error: true,
        message: `Could not delete the product with #${productId}. ${err}`,
      });
    }
  };
}
