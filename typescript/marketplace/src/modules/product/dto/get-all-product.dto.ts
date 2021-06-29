import { IsBoolean, IsNumber } from 'class-validator';

export class GetAllProductsDTO {
  @IsNumber()
  page?: number;

  @IsBoolean()
  latest?: boolean;
}
