import { getRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateShopDTO } from './dto/create-shop.dto';
import { Shop } from './shop.entity';

export class ShopService {
  private shopRepository = getRepository(Shop);

  create = async (userId: string, image: any, shopData: CreateShopDTO) => {
    const newShop = this.shopRepository.create({
      ...shopData,
      image: image,
      ower: { id: userId } as User,
    });
    const savedShop = await this.shopRepository.save(newShop);
    const shop = {
      id: savedShop.id,
      name: savedShop.name,
      description: savedShop.description,
      image: savedShop.image,
    };
    return { ...shop };
  };

  getAll = async () => {
    const shops = await this.shopRepository.find();
    return shops;
  };

  delete = async (id: string) => {
    const deleteShop = await this.shopRepository.delete({ id });
    if (deleteShop.affected === 0) {
      throw new Error(`Could not delete Shop with #${id}.`);
    }
    return deleteShop;
  };
}
