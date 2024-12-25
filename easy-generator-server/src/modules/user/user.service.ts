import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly loggerService: LoggerService,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async createUser(userData: UserDTO) {
    try {
      this.loggerService.log('Receieved user data from request');
      const user = await this.findByEmail(userData.email);
      if (user) {
        this.loggerService.error('Existing user record found', '');
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'User Already Exists',
        };
      }
      userData.password = await bcrypt.hash(userData.password, 8);
      const createdUser = new this.userModel(userData);
      await createdUser.save();
      this.loggerService.log('User saved in db successfully');
      return { statusCode: HttpStatus.CREATED, message: 'User Registered' };
    } catch (Err) {
      if (Err instanceof Error) {
        this.loggerService.error(Err.message, JSON.stringify(Err));
        throw new Error(Err.message);
      }
    }
  }
}
