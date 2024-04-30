import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/services/auth.service';
import { BcryptCrypter } from '@/shared/infrastructure/adapters/crypter/bcrypt-crypter';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: '5ca25858-8fc1-41e4-91a8-afc5a71959f1',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [BcryptCrypter, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
