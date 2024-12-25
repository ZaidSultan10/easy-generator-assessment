import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  LoggerService,
} from '@nestjs/common';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UseGuards(PassportLocalGuard)
  async login(
    @Request() req: ExpressRequest,
  ): Promise<{ accessToken: string }> {
    return req.user as { accessToken: string };
  }

  @Get('verifyToken')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() req: ExpressRequest) {
    return req.user;
  }
}
