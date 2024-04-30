import { UserService } from '@/modules/user/application/services/user.service';
import { Password } from '@/modules/user/value-objects/password.value-object';
import { ApplicationOutput } from '@/shared/application/output/application-output';
import { BcryptCrypter } from '@/shared/infrastructure/adapters/crypter/bcrypt-crypter';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type SignInParams = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private crypter: BcryptCrypter,
  ) {}

  async signIn({ email, password }: SignInParams) {
    const user = await this.userService.getByEmail(email);
    if (!user)
      throw new UnauthorizedException('E-mail ou Senha estão incorretos!');

    if (!Password.isValid(password))
      throw new UnauthorizedException('E-mail ou Senha estão incorretos!');

    if (
      !Password.comparePasswordWithHash(this.crypter, {
        passwordHash: user.password,
        passwordInput: password,
      })
    )
      throw new UnauthorizedException('E-mail ou Senha estão incorretos!');

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return new ApplicationOutput({ accessToken });
  }
}
