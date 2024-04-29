import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { PrismaService } from '@/src/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';
import { GetByEmailAndPasswordUseCase } from './application/usecases/get-by-email-and-password.usecase';
import { UserController } from './presentation/controller/user.controller';

@Module({
  providers: [PrismaService, UserService, GetByEmailAndPasswordUseCase],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
