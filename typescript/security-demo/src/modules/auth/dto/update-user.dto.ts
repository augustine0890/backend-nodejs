import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username!: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email!: string;

  @IsBoolean()
  seller: boolean;
}
