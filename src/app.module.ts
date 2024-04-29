import { Module } from '@nestjs/common';
import { UserController } from './modules/user/presentation/controller/user.controller';

@Module({
  controllers: [UserController],
})
export class AppModule {}
