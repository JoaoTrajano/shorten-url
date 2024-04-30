import { Prisma } from '@prisma/client';
import { ShortUrls as ShortUrlsSchema } from '@prisma/client';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';

export class UrlsMapper {
  static toDomain(
    schema: Prisma.ShortUrlsGetPayload<Prisma.ShortUrlsArgs>,
  ): ShortUrlEntity {
    const user = (
      schema as Prisma.ShortUrlsGetPayload<{ include: { user: true } }>
    ).user;

    const entity = new ShortUrlEntity({
      user,
      domain: schema.domain,
      path: schema.path,
      url: schema.path,
    });
    entity.id = schema.id;
    entity.createdAt = schema.createdAt;
    entity.updatedAt = schema.updatedAt;

    return entity;
  }

  static toPersistence(shortUrlEntity: ShortUrlEntity): ShortUrlsSchema {
    return {
      id: shortUrlEntity.id,
      idUser: shortUrlEntity.user.id,
      domain: shortUrlEntity.domain,
      path: shortUrlEntity.path,
      url: shortUrlEntity.url,
      createdAt: shortUrlEntity.createdAt,
      updatedAt: shortUrlEntity.updatedAt,
    };
  }
}
