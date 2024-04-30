import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ShortUrlModule } from './modules/url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    ShortUrlModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
