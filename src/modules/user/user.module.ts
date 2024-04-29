import { Module } from '@nestjs/common';
import { UserController } from './presentation/controller/user.controller';
import { UserService } from './application/services/user.service';

@Module({
  providers: [UserService],
  exports: [UserController],
})
export class UserModule {}
