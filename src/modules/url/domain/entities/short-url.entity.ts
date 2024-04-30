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
  public totalClicks: number;
  public deletedAt: Date | null;

  constructor({ urlOriginal }: ShortUrlEntityProps) {
    super();
    this.urlOriginal = urlOriginal;
    this.totalClicks = 0;
    this.deletedAt = null;
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
    if (!this.validURL(this.urlOriginal)) throw Error('URL Inválida!');

    const regex = /^(https?:\/\/[^\/]+)\/?.*$/i;
    const matches = this.urlOriginal.match(regex);

    if (matches && matches[1]) {
      this.domain = matches[1];
    } else {
      throw new Error('URL Inválida!');
    }
  }

  extractPath(): void {
    if (!this.validURL(this.urlOriginal)) throw Error('URL Inválida!');

    const regex = /^https?:\/\/[^\/]+(\/.*)$/i;
    const matches = this.urlOriginal.match(regex);

    if (matches && matches[1]) {
      this.path = matches[1];
    } else {
      throw new Error('');
    }
  }

  getUrlOriginal(): string {
    return this.urlOriginal;
  }

  getShortUrl(): string {
    return `${this.domain}/${this.urlShort}`;
  }

  updateUrlOrigin(urlOrigin: string) {
    this.urlOriginal = urlOrigin;
    this.extractDomain();
    this.extractPath();
    this.shorten();
  }
}
