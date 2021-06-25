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
}
