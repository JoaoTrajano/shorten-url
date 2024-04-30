import { BadGatewayException, Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { Password } from '../../value-objects/password.value-object';
import { BcryptCrypter } from '@/shared/infrastructure/adapters/crypter/bcrypt-crypter';
import { ApplicationOutput } from '@/shared/application/output/application-output';

export type CreateUserUseCaseInput = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(
    input: CreateUserUseCaseInput,
  ): Promise<ApplicationOutput<UserEntity>> {
    if (!input.name) throw new BadGatewayException();
    if (!input.email) throw new BadGatewayException();
    if (!input.password) throw new BadGatewayException();

    if (!Password.isValid(input.password)) throw new BadGatewayException();

    const password = new Password(input.password);
    password.encryptPassword(new BcryptCrypter());

    const user = new UserEntity({
      name: input.name,
      email: input.email,
      password: password.value,
    });

    const userCreated = await this.userService.create(user);

    return new ApplicationOutput(userCreated);
  }
}
