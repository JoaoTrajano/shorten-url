import { Password } from '@/modules/user/value-objects/password.value-object';
import { ShortUrlEntity } from '../short-url.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { BcryptCrypter } from '@/shared/infrastructure/adapters/crypter/bcrypt-crypter';

describe('ShortUrlEntity', () => {
  let shortUrlEntity: ShortUrlEntity;
  const password = new Password('123');
  password.encryptPassword(new BcryptCrypter());

  const mockUser: UserEntity = {
    id: '1',
    name: 'Name User',
    email: 'example@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: password.value,
  };

  beforeEach(() => {
    shortUrlEntity = new ShortUrlEntity({
      urlOriginal: 'https://example.com/teste',
    });
    shortUrlEntity.user = mockUser;
  });

  describe('Password', () => {
    it('should Password defined', () => {
      expect(shortUrlEntity).toBeDefined();
    });

    it('should return false for an invalid URL', () => {
      expect(shortUrlEntity.validURL('invalid-url')).toBeFalsy();
    });
  });

  describe('validURL', () => {
    it('should return true for a valid URL', () => {
      expect(shortUrlEntity.validURL('https://example.com/teste')).toBeTruthy();
    });

    it('should return false for an invalid URL', () => {
      expect(shortUrlEntity.validURL('invalid-url')).toBeFalsy();
    });
  });

  describe('shorten', () => {
    it('should generate a short URL', () => {
      const originalUrl = shortUrlEntity.path;
      expect(shortUrlEntity.path).not.toEqual(originalUrl);
    });
  });

  describe('extractDomain', () => {
    it('should extract the domain from a URL', () => {
      shortUrlEntity.extractDomain();
      expect(shortUrlEntity.domain).toEqual('https://example.com');
    });

    it('should return null if the URL is invalid', () => {
      shortUrlEntity.path = 'invalid-url';
      shortUrlEntity.extractDomain();
      expect(shortUrlEntity.domain).toBeNull();
    });
  });

  describe('extractPath', () => {
    it('should extract the URL from a string', () => {
      shortUrlEntity.extractPath();
      expect(shortUrlEntity.path).toEqual('/teste');
    });

    it('should return null if the URL is invalid', () => {
      shortUrlEntity.path = 'invalid-url';
      shortUrlEntity.extractPath();
      expect(shortUrlEntity.path).toBeNull();
    });
  });

  describe('getFullLink', () => {
    it('should return the full link', () => {
      expect(shortUrlEntity.getUrlOriginal()).toEqual(
        'https://example.com/teste',
      );
    });
  });

  describe('getCustomUrl', () => {
    it('should return the full custom link', () => {
      expect(shortUrlEntity.getShortUrl()).not.toEqual(
        shortUrlEntity.getUrlOriginal(),
      );
    });
  });
});
