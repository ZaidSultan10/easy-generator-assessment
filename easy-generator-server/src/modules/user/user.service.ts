import {
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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

  async createUser(userDto: UserDTO) {
    this.loggerService.log('Creating a new user');
    const user = await this.findByEmail(userDto.email);
    if (user) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'User Already Exists',
      };
    }
    userDto.password = await bcrypt.hash(userDto.password, 8);
    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return { statusCode: HttpStatus.CREATED, message: 'User Registered' };
  }
}
