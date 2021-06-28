import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../modules/auth/user.entity';
import { Product } from '../modules/product/product.entity';

export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const { id } = res.locals.user;
  const shopId = req.params.shopId;
  const productId = req.params.productId;

  const user = await userRepository.find({
    relations: ['shops'],
    where: { id: id },
  });
  const shopIds: string[] = user
    .map((user) => user.shops.map((shop) => shop.id))
    .reduce((prev, next) => prev.concat(next));
  res.locals = { ...res.locals, shopIds };

  if (shopId) {
    if (shopIds.includes(shopId)) {
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
      if (shopIds.includes(shopId)) {
        next();
      } else {
        res.status(403).json({
          message: 'User is not authoried.',
        });
        next(Error);
      }
    }
  }
};
