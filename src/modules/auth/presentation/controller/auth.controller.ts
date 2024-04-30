import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDTO } from '../../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async login(@Body() body: LoginDTO) {
    const output = await this.authService.signIn({ ...body });
    return output.toHttpResponse();
  }
}
