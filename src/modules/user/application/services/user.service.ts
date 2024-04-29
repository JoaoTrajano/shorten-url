import { PrismaService } from '@/src/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';
import { UserServiceInterface } from './user-service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }
}
