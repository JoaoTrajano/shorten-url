import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { GetByEmailAndPasswordUseCase } from './application/usecases/get-by-email-and-password.usecase';
import { PrismaService } from '@/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';

@Module({
  providers: [PrismaService, UserService, GetByEmailAndPasswordUseCase],
  exports: [UserService],
})
export class UserModule {}
