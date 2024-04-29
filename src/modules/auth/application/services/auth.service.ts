import { UserEntity } from '@/src/modules/user/domain/entities/user.entity';
import { UserMapper } from '@/src/modules/user/infrastructure/mappers/user.mapper';
import { PrismaService } from '@/src/shared/infrastructure/database/postgres/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }
}
