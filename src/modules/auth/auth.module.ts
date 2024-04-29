import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controller/auth.controller';
import { AuthService } from './application/services/auth.service';
import { PrismaService } from '@/src/shared/infrastructure/database/postgres/prisma/service/prisma.service';
import { GetByEmailAndPasswordUseCase } from './application/usecases';

@Module({
  providers: [PrismaService, AuthService, GetByEmailAndPasswordUseCase],
  controllers: [AuthController],
  exports: [AuthModule],
})
export class AuthModule {}
