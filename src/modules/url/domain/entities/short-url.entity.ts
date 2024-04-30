import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { Entity } from '@/shared/domain/entities/user.entity';
import { ShortURL } from '@/shared/infrastructure/adapters/shortURL/short-url';

export type ShortUrlEntityProps = {
  user: UserEntity;
  url: string;
  domain?: string;
  path?: string;
};

export class ShortUrlEntity extends Entity {
  public user: UserEntity;
  public domain: string;
  public path: string;
  public url: string;

  constructor(props: ShortUrlEntityProps) {
    super();
    Object.assign(this, {
      ...props,
      domain: this.extractDomain(),
      path: this.extractPath(),
    });
  }

  validURL(url: string): boolean {
    const regex = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    return regex.test(url);
  }

  shorten(): void {
    this.path = ShortURL.shorten();
  }

  extractDomain(): void | null {
    if (!this.validURL(this.url)) return null;

    const regex = /^(https?:\/\/[^\/]+)\/?.*$/i;

    const matches = this.url.match(regex);

    if (matches && matches[1]) {
      this.domain = matches[1];
    } else {
      return null;
    }
  }

  extractPath(): void | null {
    if (!this.validURL(this.url)) return null;

    const regex = /^https?:\/\/[^\/]+(\/.*)$/i;

    const matches = this.url.match(regex);

    if (matches && matches[1]) {
      this.path = matches[1];
    } else {
      return null;
    }
  }

  getUrl() {
    return this.url;
  }
}
