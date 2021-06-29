import { getRepository } from 'typeorm';
import { Shop } from '../shop/shop.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';

export class ProductService {
  private productRepository = getRepository(Product);

  create = async (id: string, image: string, productData: CreateProductDTO) => {
    const newProduct = this.productRepository.create({
      ...productData,
      image: image,
      shop: { id } as Shop,
    });

    const savedProduct = await this.productRepository.save(newProduct);
    const product = {
      id: savedProduct.id,
      name: savedProduct.name,
      discription: savedProduct.description,
      category: savedProduct.category,
      quantity: savedProduct.quantity,
      price: savedProduct.price,
    };
    return { ...product };
  };

  getAll = async (page: number = 10, latest: boolean = true) => {
    latest = latest === true;
    if (latest) {
      const products = await this.productRepository.find({
        order: {
          created_at: 'DESC',
        },
        take: page,
      });
      return products;
    }
    const products = await this.productRepository.find({ take: page });
    return products;
  };

  getById = async (id: string) => {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new Error();
    }
    return product;
  };

  findByShop = async (shopId: string) => {
    const products = await this.productRepository.find({
      where: {
        shop: shopId,
      },
    });
    return products;
  };

  delete = async (productId: string) => {
    const deleteProduct = await this.productRepository.delete(productId);
    if (deleteProduct.affected === 0) {
      throw new Error(`Could not delete the product with #${productId}`);
    }
  };
}
