import { v4 as uuid } from 'uuid';

export class ShortURL {
  static readonly DEFAULT_SIZE = 6;

  static shorten(): string {
    return uuid(ShortURL.DEFAULT_SIZE);
  }
}
