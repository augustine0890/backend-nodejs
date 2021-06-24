import { IsString } from 'class-validator';

export class UpdateShopDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  ownerId: string;
}
