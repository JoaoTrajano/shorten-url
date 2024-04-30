import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';
import { PrismaService } from '@/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity | null> {
    const userCreated = await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(userCreated);
  }

  async getById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }
}
