import { getRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateShopDTO } from './dto/create-shop.dto';
import { Shop } from './shop.entity';
import { AuthService } from '../auth/auth.service';
import { UpdateShopDTO } from './dto/update-shop.dto';

export class ShopService {
  private shopRepository = getRepository(Shop);
  private authService = new AuthService();

  create = async (image: string, id: string, shopData: CreateShopDTO) => {
    const newShop = this.shopRepository.create({
      ...shopData,
      image: image,
      owner: { id } as User,
    });

    const owner = await this.authService.get(id);

    if (owner && owner.seller) {
      const savedShop = await this.shopRepository.save(newShop);
      const shop = {
        id: savedShop.id,
        name: savedShop.name,
        description: savedShop.description,
        image: savedShop.image,
        owner: savedShop.owner,
      };
      return { ...shop };
    } else {
      return `You may not a seller.`;
    }
  };

  update = async (id: string, updateShopData: UpdateShopDTO) => {
    await this.shopRepository.update(id, updateShopData);
    const updatedShop = await this.shopRepository.findOne(id);
    if (updatedShop) {
      return updateShopData;
    }
    return {
      error: true,
      message: `Could not find the shop with #${id}`,
    };
  };

  getAll = async () => {
    const shops = await this.shopRepository.find();
    return shops;
  };

  getById = async (id: string) => {
    const shop = await this.shopRepository.findOne(id);
    return shop;
  };

  getOwner = async (id: string) => {
    const shop = await this.shopRepository.findOne({
      relations: ['owner'],
      where: { id: id },
    });
    if (!shop) {
      throw new Error(`Could not find the shop with #${id}.`);
    }
    return shop.owner.id;
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
      throw new Error(`Could not delete the shop with #${id}.`);
    }
    return deleteShop;
  };
}
