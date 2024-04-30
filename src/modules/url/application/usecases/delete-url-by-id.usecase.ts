import { BadGatewayException, Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import { ShortUrlService } from '../services/short-url.service';
import { ApplicationOutput } from '@/shared/application/output/application-output';

export type DeleteUrlByIdUseCaseInput = {
  id: string;
};

@Injectable()
export class DeleteUrlByIdUseCase {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  async execute(
    input: DeleteUrlByIdUseCaseInput,
  ): Promise<ApplicationOutput<{ url: ShortUrlEntity }>> {
    if (!input.id) throw new BadGatewayException();

    const shortUrl = await this.shortUrlService.getById(input.id);
    if (!shortUrl) throw new BadGatewayException();
    shortUrl.deletedAt = new Date();

    const url = await this.shortUrlService.update(shortUrl);

    return new ApplicationOutput({ url });
  }
}
