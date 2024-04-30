import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { Entity } from '@/shared/domain/entities/user.entity';
import { ShortURL } from '@/shared/infrastructure/adapters/shortURL/short-url';

export type ShortUrlEntityProps = {
  urlOriginal: string;
};

export class ShortUrlEntity extends Entity {
  public user: UserEntity;
  public domain: string;
  public path: string;
  public urlOriginal: string;
  public urlShort: string;

  constructor({ urlOriginal }: ShortUrlEntityProps) {
    super();
    this.urlOriginal = urlOriginal;
    this.extractDomain();
    this.extractPath();
    this.shorten();
  }

  validURL(url: string): boolean {
    const regex = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    return regex.test(url);
  }

  public shorten(): void {
    this.urlShort = `${this.domain}/${ShortURL.shorten({})}`;
  }

  extractDomain(): void | null {
    if (!this.validURL(this.urlOriginal)) return null;

    const regex = /^(https?:\/\/[^\/]+)\/?.*$/i;
    const matches = this.urlOriginal.match(regex);

    if (matches && matches[1]) {
      this.domain = matches[1];
    } else {
      return null;
    }
  }

  extractPath(): void | null {
    if (!this.validURL(this.urlOriginal)) return null;

    const regex = /^https?:\/\/[^\/]+(\/.*)$/i;
    const matches = this.urlOriginal.match(regex);

    if (matches && matches[1]) {
      this.path = matches[1];
    } else {
      return null;
    }
  }

  getUrlOriginal(): string {
    return this.urlOriginal;
  }

  getShortUrl(): string {
    return this.urlShort;
  }
}
