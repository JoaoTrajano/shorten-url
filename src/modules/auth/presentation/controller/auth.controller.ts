import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDTO } from '../../dtos/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/')
  async login(@Req() req: Request) {
    const body: LoginDTO = req.body;

    const output = await this.authService.signIn({ ...body });
    return output.toHttpResponse();
  }
}
