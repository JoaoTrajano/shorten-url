import { BadGatewayException, Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import { ShortUrlService } from '../services/short-url.service';
import { ApplicationOutput } from '@/shared/application/output/application-output';

export type GetUrlOriginByUrlShortUseCaseInput = {
  urlOrigin: string;
};

@Injectable()
export class GetUrlOriginByUrlShortUseCase {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  async execute(
    input: GetUrlOriginByUrlShortUseCaseInput,
  ): Promise<ApplicationOutput<{ shortUrl: ShortUrlEntity }>> {
    if (!input.urlOrigin) throw new BadGatewayException();

    const shortUrl = await this.shortUrlService.getByURLShort(input.urlOrigin);
    if (!shortUrl) throw new BadGatewayException();

    return new ApplicationOutput({ shortUrl });
  }
}
