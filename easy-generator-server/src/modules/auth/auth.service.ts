import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      this.loggerService.log('Received username and password to validate user');
      const user = await this.userService.findByEmail(username);

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload);
        this.loggerService.log('Set payload and generate token');
        return { accessToken: token };
      }
      this.loggerService.error('Wrong username or password', '');
      return {
        accessToken: null,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid username or password',
      };
    } catch (Err) {
      if (Err instanceof Error) {
        this.loggerService.error(Err.message, JSON.stringify(Err));
        throw new Error(Err.message);
      }
    }
  }
}
