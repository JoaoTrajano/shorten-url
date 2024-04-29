import { BcryptCrypter } from '@/src/shared/infrastructure/adapters/crypter/crypter';

export type ComparePasswordWithHashParams = {
  passwordInput: string;
  passwordHash: string;
};

export class Password {
  public value: string;
  public constructor(value: string) {
    this.value = value;
  }

  static isValid(value: string): boolean {
    return value !== undefined && value !== null && value.length > 0;
  }

  public encryptPassword(crypter: BcryptCrypter) {
    this.value = crypter.encrypt(this.value) as string;
    return;
  }

  public encryptNewPassword(crypter: BcryptCrypter, password: Password): void {
    this.value = crypter.encrypt(password.value) as string;
    return;
  }

  static comparePasswordWithHash(
    crypter: BcryptCrypter,
    { passwordInput, passwordHash }: ComparePasswordWithHashParams,
  ): boolean {
    return crypter.compare(passwordInput, passwordHash) as boolean;
  }
}
