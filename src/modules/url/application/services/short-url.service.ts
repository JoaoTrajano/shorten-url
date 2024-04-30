import { PrismaService } from '@/shared/infrastructure/adapters/database/postgres/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { ShortUrlMapper } from '../../infrastructure/mappers/urls-mapper.entity';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';

@Injectable()
export class ShortUrlService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(shortUrl: ShortUrlEntity): Promise<ShortUrlEntity | null> {
    const shortUrlCreated = await this.prismaService.shortUrls.create({
      data: ShortUrlMapper.toPersistence(shortUrl),
      include: { user: true },
    });

    if (!shortUrlCreated) return null;

    return ShortUrlMapper.toDomain(shortUrlCreated);
  }

  async update(shortUrl: ShortUrlEntity): Promise<ShortUrlEntity | null> {
    const shortUrlUpdated = await this.prismaService.shortUrls.update({
      where: {
        id: shortUrl.id,
      },
      data: ShortUrlMapper.toPersistence(shortUrl),
      include: { user: true },
    });

    return ShortUrlMapper.toDomain(shortUrlUpdated);
  }

  async getByUserId(userId: string): Promise<ShortUrlEntity[] | null> {
    const shortUrlCreated = await this.prismaService.shortUrls.findMany({
      where: {
        idUser: userId,
      },
      include: { user: true },
    });

    return shortUrlCreated
      ? shortUrlCreated.map(ShortUrlMapper.toDomain)
      : null;
  }

  async getById(id: string): Promise<ShortUrlEntity | null> {
    const shortUrl = await this.prismaService.shortUrls.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: { user: true },
    });

    return shortUrl ? ShortUrlMapper.toDomain(shortUrl) : null;
  }

  async getByURLShort(urlShort: string): Promise<ShortUrlEntity | null> {
    const shortUrl = await this.prismaService.shortUrls.findFirst({
      where: {
        urlShort,
        deletedAt: null,
      },
      include: { user: true },
    });

    return shortUrl ? ShortUrlMapper.toDomain(shortUrl) : null;
  }
}
