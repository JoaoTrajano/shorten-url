import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controller/auth.controller';
import { AuthService } from './application/services/auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthModule],
})
export class AuthModule {}
