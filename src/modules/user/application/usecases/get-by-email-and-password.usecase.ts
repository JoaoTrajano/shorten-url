import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';
import { UserEntity } from '../../domain/entities/user.entity';

export type GetByEmailAndPasswordUseCaseInput = {
  email: string;
  password: string;
};

@Injectable()
export class GetByEmailAndPasswordUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(
    input: GetByEmailAndPasswordUseCaseInput,
  ): Promise<UserEntity | null> {
    if (!input.email) {
      return null;
    }

    if (!input.password) {
      return null;
    }

    const user = await this.userService.getByEmail(input.email);

    return user ? UserMapper.toDomain(user) : null;
  }
}
