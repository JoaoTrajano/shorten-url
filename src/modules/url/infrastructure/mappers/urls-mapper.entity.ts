import { Prisma } from '@prisma/client';
import { ShortUrls as ShortUrlsSchema } from '@prisma/client';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';

export class ShortUrlMapper {
  static toDomain(
    schema: Prisma.ShortUrlsGetPayload<Prisma.ShortUrlsArgs>,
  ): ShortUrlEntity {
    const user = (
      schema as Prisma.ShortUrlsGetPayload<{ include: { user: true } }>
    ).user;

    const entity = new ShortUrlEntity({
      urlOriginal: schema.urlOriginal,
    });

    if (user) entity.user = user;
    entity.id = schema.id;
    entity.createdAt = schema.createdAt;
    entity.updatedAt = schema.updatedAt;

    return entity;
  }

  static toPersistence(shortUrlEntity: ShortUrlEntity): ShortUrlsSchema {
    return {
      id: shortUrlEntity.id,
      idUser: shortUrlEntity.user ? shortUrlEntity.user.id : null,
      domain: shortUrlEntity.domain,
      path: shortUrlEntity.path,
      urlOriginal: shortUrlEntity.urlOriginal,
      urlShort: shortUrlEntity.urlShort,
      createdAt: shortUrlEntity.createdAt,
      updatedAt: shortUrlEntity.updatedAt,
    };
  }
}
