import { Module } from '@nestjs/common';
import { UserController } from './modules/user/presentation/controller/user.controller';
import { AuthService } from './modules/auth/application/services/auth.service';

@Module({
  controllers: [UserController],
  providers: [AuthService],
})
export class AppModule {}
