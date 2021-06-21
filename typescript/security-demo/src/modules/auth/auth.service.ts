import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from './user.entity';
import { User as IUser } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailOrUsernameInUseExcepton } from '../../exceptions/EmailOrUsernameInUse';
import { DataStoredInToken } from '../../types/dataStoredInToken.interface';
import { HttpException } from '../../exceptions/HttpException';
import { LoginUserDTO } from './dto/login-user.dto';
import { WrongCredentialsException } from '../../exceptions/WrongCredentialException';

export class AuthService {
  private userRepository = getRepository(User);

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
    const user = { id: savedUser.id, username: savedUser.username };

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

    const { id, username } = existingUser;
    const token = this.createToken(existingUser);
    return { token, id, username };
  };

  createToken = ({ id, username }: IUser): string => {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const dataStoredInToken: DataStoredInToken = { id, username };

    if (!secret) {
      throw new HttpException(500, 'Something goes wrong');
    }

    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  };
}
