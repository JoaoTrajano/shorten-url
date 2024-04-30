import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';
import { ShortURLController } from './presentation/controller/short-url.controller';
import { ShortUrlService } from './application/services/short-url.service';
import { AuthModule } from '../auth/auth.module';
import { GenerateShortUrlUseCase } from './application/usecases/generate-short-url.usecase';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, ShortUrlService, GenerateShortUrlUseCase],
  controllers: [ShortURLController],
  exports: [ShortUrlService],
})
export class ShortUrlModule {}
