import { v4 as uuid } from 'uuid';

export const enum DefaultSize {
  DEFAULT_SIZE = 6,
}

export type ShortURLParams = {
  size?: number;
};

export class ShortURL {
  static shorten({ size }: ShortURLParams): string {
    const id = uuid() as string;
    if (size) return id.slice(0, size);

    return id.slice(0, DefaultSize.DEFAULT_SIZE);
  }
}
