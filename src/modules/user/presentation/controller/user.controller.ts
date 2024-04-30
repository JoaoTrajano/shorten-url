import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../../dtos/user.dto';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async login(@Body() body: UserDTO) {
    const output = await this.createUserUseCase.execute({ ...body });
    return output.toHttpResponse();
  }
}
