import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../../dtos/login.dto';
import { GetByEmailAndPasswordUseCase } from '../../application/usecases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly getByEmailAndPasswordUseCase: GetByEmailAndPasswordUseCase,
  ) {}
  @Post('/')
  async login(@Body() login: LoginDTO) {
    await this.getByEmailAndPasswordUseCase.execute({
      email: login.email,
      password: login.password,
    });
  }
}
