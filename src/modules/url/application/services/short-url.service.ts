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
}
