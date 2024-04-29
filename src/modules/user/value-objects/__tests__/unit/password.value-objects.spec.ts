import { BcryptCrypter } from '@/src/shared/infrastructure/adapters/crypter/crypter';
import { Password } from '../../password.value-object';

describe('Password', () => {
  let crypter: BcryptCrypter;
  let password: Password;

  beforeEach(() => {
    crypter = new BcryptCrypter();
    password = new Password('password123');
  });

  describe('isValid', () => {
    it('should return true for a valid password', () => {
      expect(Password.isValid('password123')).toBe(true);
    });

    it('should return false for null value', () => {
      expect(Password.isValid(null)).toBe(false);
    });

    it('should return false for undefined value', () => {
      expect(Password.isValid(undefined)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(Password.isValid('')).toBe(false);
    });
  });

  describe('encryptPassword', () => {
    it('should encrypt the password', () => {
      const originalValue = password.value;
      password.encryptPassword(crypter);
      expect(password.value).not.toBe(originalValue);
    });
  });

  describe('encryptNewPassword', () => {
    it('should encrypt a new password', () => {
      const newPassword = new Password('newpassword');
      password.encryptNewPassword(crypter, newPassword);
      expect(password.value).not.toBe('newpassword');
    });
  });

  describe('comparePasswordWithHash', () => {
    it('should return true for matching password and hash', () => {
      const password = new Password('123');
      password.encryptPassword(crypter);

      const match = Password.comparePasswordWithHash(crypter, {
        passwordHash: password.value,
        passwordInput: '123',
      });
      expect(match).toBe(true);
    });

    it('should return false for non-matching password and hash', () => {
      const hash = crypter.encrypt('wrongpassword');
      const match = Password.comparePasswordWithHash(crypter, {
        passwordHash: hash,
        passwordInput: '123',
      });
      expect(match).toBe(false);
    });
  });
});
