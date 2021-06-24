import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShopDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
