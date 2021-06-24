import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import crypto from 'crypto';

import { User } from './user.entity';
import { User as IUser } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailOrUsernameInUseExcepton } from '../../exceptions/EmailOrUsernameInUse';
import { DataStoredInToken } from '../../types/dataStoredInToken.interface';
import { HttpException } from '../../exceptions/HttpException';
import { LoginUserDTO } from './dto/login-user.dto';
import { WrongCredentialsException } from '../../exceptions/WrongCredentialException';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { UpdateUserDTO } from './dto/update-user.dto';

export class AuthService {
  private userRepository = getRepository(User);
  private secret_key = 'ceb1c79889ffb4d0e1aa4a74d3be2723';

  signUp = async (userData: CreateUserDTO) => {
    const { username, email, password } = userData;
    const existingUser = await this.userRepository
      .createQueryBuilder()
      .where('username = :username OR email = :email', { username, email })
      .getMany();

    if (existingUser.length !== 0) {
      throw new EmailOrUsernameInUseExcepton();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    const user = {
      id: savedUser.id,
      username: savedUser.username,
      seller: savedUser.seller,
    };

    const token = this.createToken(savedUser);
    return { token, ...user };
  };

  signIn = async ({ email, password }: LoginUserDTO) => {
    const existingUser = await this.userRepository.findOne({ email });
    if (!existingUser) {
      throw new WrongCredentialsException();
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new WrongCredentialsException();
    }

    const { id, username, seller } = existingUser;
    const token = this.createToken(existingUser);
    return { token, id, username, seller };
  };

  get = async (id: string) => {
    const user = await this.userRepository.findOne(id);
    return user;
  };
  update = async (id: string, info: UpdateUserDTO) => {
    let user = await this.userRepository.update(id, info);
    return user;
  };

  deleteUser = async (id: string) => {
    const deleteUser = await this.userRepository.delete({ id });
    if (deleteUser.affected === 0) {
      throw new UserNotFoundException(id);
    }
    return deleteUser;
  };

  getAllUser = async () => {
    const users = this.userRepository.find();
    return users;
  };

  private createToken = ({ id, username }: IUser): string => {
    const expiresIn = 60 * 60 * 3; // 3 hours or an hour
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const dataStoredInToken: DataStoredInToken = { id, username };

    if (!secret) {
      throw new HttpException(500, 'Something goes wrong');
    }

    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  };

  encryptData = async (payload: string) => {
    const message = JSON.stringify(payload);
    const iv = Buffer.from(crypto.randomBytes(16)).toString('hex').slice(0, 16);

    const encryptor = crypto.createCipheriv('aes-256-cbc', this.secret_key, iv);
    const encrypted =
      Buffer.from(iv).toString('base64') +
      encryptor.update(message, 'utf8', 'base64') +
      encryptor.final('base64');
    const hmac = crypto
      .createHmac('md5', this.secret_key)
      .update(encrypted)
      .digest('hex');
    return {
      encrypted,
      hmac,
    };
  };

  decryptData = async (
    encrypted: string,
    hmac: string,
    toJson: boolean = true,
  ): Promise<{} | string | boolean> => {
    if (
      crypto
        .createHmac('md5', this.secret_key)
        .update(encrypted)
        .digest('hex') === hmac
    ) {
      const iv = Buffer.from(encrypted.substr(0, 24), 'base64').toString();
      const decryptor = crypto.createDecipheriv(
        'aes-256-cbc',
        this.secret_key,
        iv,
      );
      const decrypted =
        decryptor.update(encrypted.substr(24), 'base64', 'utf8') +
        decryptor.final('utf8');

      if (toJson) {
        try {
          return JSON.parse(decrypted);
        } catch (err) {
          console.error(err);
          return false;
        }
      } else {
        return decrypted;
      }
    }
    console.log('Bad signature.');
    return false;
  };
}
