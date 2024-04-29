import { BcryptCrypter } from '../infrastructure/adapters/crypter/crypter';

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

  public comparePasswordWithHash(
    crypter: BcryptCrypter,
    password: Password,
  ): boolean {
    return crypter.compare(password.value, this.value) as boolean;
  }

  public changePassword(
    crypter: BcryptCrypter,
    newPassword: Password,
    lastPassword: Password,
  ): void {
    if (!lastPassword && newPassword) {
      return null;
    } else if (lastPassword && !newPassword) {
      return null;
    } else if (lastPassword && newPassword) {
      const isPasswordCorrect = this.comparePasswordWithHash(
        crypter,
        lastPassword,
      );
      if (!isPasswordCorrect) return null;

      this.encryptNewPassword(crypter, newPassword);
    }
  }

  public newPassword(crypter: BcryptCrypter, newPassword: Password): void {
    if (!newPassword) return null;

    this.encryptNewPassword(crypter, newPassword);
  }
}
