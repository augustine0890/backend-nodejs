import express, { RequestHandler } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { Controller } from '../../types/controller.interface';
import { imageUpload } from '../../utils/uploadImg';
import { CreateProductDTO } from './dto/create-product.dto';
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
      authMiddleware,
      imageUpload.single('image'),
      this.createProduct,
    );
    this.router.get(`${this.path}`, this.getAllProducts);
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
      const limit = Number(req.query.page);
      const products = await this.productService.getAll(limit);
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
    }
  };
}
