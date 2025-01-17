import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  RegisterUser(@Body() userData: UserDTO) {
    return this.userService.createUser(userData);
  }
}
