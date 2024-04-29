import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../../dtos/login.dto';

@Controller('auth')
export class AuthController {
  @Post('/')
  async login(@Body() login: LoginDTO) {
    console.log(login);
  }
}
