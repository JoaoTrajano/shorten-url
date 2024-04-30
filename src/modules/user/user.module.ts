import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { PrismaService } from '@/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { UserController } from './presentation/controller/user.controller';

@Module({
  providers: [PrismaService, UserService, CreateUserUseCase],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
