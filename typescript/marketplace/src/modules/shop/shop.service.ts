import { getRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateShopDTO } from './dto/create-shop.dto';
import { Shop } from './shop.entity';
import { AuthService } from '../auth/auth.service';

export class ShopService {
  private shopRepository = getRepository(Shop);
  private authService = new AuthService();

  create = async (image: string, shopData: CreateShopDTO) => {
    const newShop = this.shopRepository.create({
      ...shopData,
      image: image,
    });

    const owner = await this.authService.get(shopData.ownerId);

    if (owner && owner.seller) {
      const savedShop = await this.shopRepository.save(newShop);
      const shop = {
        id: savedShop.id,
        name: savedShop.name,
        description: savedShop.description,
        image: savedShop.image,
        ownerId: savedShop.owner,
      };
      return { ...shop };
    } else {
      return `You may not a seller.`;
    }
  };

  getAll = async () => {
    const shops = await this.shopRepository.find();
    return shops;
  };

  getById = async (id: string) => {
    const shop = await this.shopRepository.findOne(id);
    return shop;
  };

  findByOwner = async (ownerId: string): Promise<Shop[]> => {
    const shops = await this.shopRepository.find({
      where: {
        owner: ownerId,
      },
    });
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
