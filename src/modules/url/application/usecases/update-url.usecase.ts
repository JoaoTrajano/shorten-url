import { BadGatewayException, Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import { ShortUrlService } from '../services/short-url.service';
import { ApplicationOutput } from '@/shared/application/output/application-output';

export type UpdateUrlUseCaseInput = {
  id: string;
  urlOrigin?: string;
  totalClicks?: number;
};

@Injectable()
export class UpdateUrlUseCase {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  async execute(
    input: UpdateUrlUseCaseInput,
  ): Promise<ApplicationOutput<{ url: ShortUrlEntity }>> {
    if (!input.id) throw new BadGatewayException();

    const shortUrl = await this.shortUrlService.getById(input.id);
    if (!shortUrl) throw new BadGatewayException();

    if (input.urlOrigin) shortUrl.updateUrlOrigin(input.urlOrigin);

    if (input.totalClicks) shortUrl.totalClicks = input.totalClicks;

    const url = await this.shortUrlService.update(shortUrl);

    return new ApplicationOutput({ url });
  }
}
