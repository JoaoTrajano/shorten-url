import { Body, Controller, Post } from '@nestjs/common';
import { GetByEmailAndPasswordUseCase } from '../../application/usecases/get-by-email-and-password.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly getByEmailAndPassowordUseCase: GetByEmailAndPasswordUseCase,
  ) {}

  @Post('/email-and-password')
  async getByEmailAndPassword(@Body() login) {
    const result = await this.getByEmailAndPassowordUseCase.execute({
      email: login.email,
      password: login.password,
    });
    console.log(result);
  }
}
