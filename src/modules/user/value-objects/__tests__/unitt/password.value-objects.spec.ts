import { BcryptCrypter } from '../../../infrastructure/adapters/crypter/crypter';
import { Password } from '../../password';

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

      const match = password.comparePasswordWithHash(
        crypter,
        new Password('123'),
      );
      expect(match).toBe(true);
    });

    it('should return false for non-matching password and hash', () => {
      const hash = crypter.encrypt('wrongpassword');
      const match = password.comparePasswordWithHash(
        crypter,
        new Password(hash),
      );
      expect(match).toBe(false);
    });
  });

  describe('changePassword', () => {
    it('should not change the password if the last password is incorrect', () => {
      const newPassword = new Password('newpassword');
      const lastPassword = new Password('wrongpassword');
      password.changePassword(crypter, newPassword, lastPassword);
      expect(password.value).toBe('password123');
    });

    it('should not change the password if either last or new password is missing', () => {
      const newPassword = new Password('newpassword');
      password.changePassword(crypter, newPassword, null);
      expect(password.value).toBe('password123');

      password.changePassword(crypter, null, newPassword);
      expect(password.value).toBe('password123');
    });
  });

  describe('newPassword', () => {
    it('should set a new password', () => {
      const newPassword = new Password('newpassword');
      password.newPassword(crypter, newPassword);
      expect(password.value).not.toBe('password123');
    });

    it('should not change the password if the new password is missing', () => {
      password.newPassword(crypter, null);
      expect(password.value).toBe('password123');
    });
  });
});
