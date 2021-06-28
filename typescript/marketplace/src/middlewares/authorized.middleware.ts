import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../modules/product/product.entity';
import { Shop } from '../modules/shop/shop.entity';

export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const shopRepository = getRepository(Shop);
  const productRepository = getRepository(Product);
  const { id } = res.locals.user;
  const shopId = req.params.shopId;
  const productId = req.params.productId;

  if (shopId) {
    const shopData = await shopRepository.findOne({
      relations: ['owner'],
      where: { id: shopId },
    });

    if (shopData && shopData.owner.id == id) {
      res.locals = { ...res.locals, shopId };
      next();
    } else {
      res.status(403).json({
        message: 'User is not authoried.',
      });
      next(Error);
    }
  }

  if (productId && !shopId) {
    const productData = await productRepository.findOne({
      relations: ['shop'],
      where: { id: productId },
    });

    if (productData) {
      const shopId = productData.shop.id;
      const shopData = await shopRepository.findOne({
        relations: ['owner'],
        where: { id: shopId },
      });

      if (shopData && shopData.owner.id == id) {
        res.locals = { ...res.locals, shopId };
        next();
      } else {
        res.status(403).json({
          message: 'User is not authoried.',
        });
      }
    }
  }
};
