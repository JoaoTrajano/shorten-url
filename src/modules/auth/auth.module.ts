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
      secret: String(process.env.JWT_SECRET),
      signOptions: { expiresIn: String(process.env.JWT_EXPIRES_IN) },
    }),
  ],
  providers: [BcryptCrypter, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
