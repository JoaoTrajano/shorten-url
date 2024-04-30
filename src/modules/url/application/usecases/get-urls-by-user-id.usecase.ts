import { BadGatewayException, Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import { ShortUrlService } from '../services/short-url.service';
import { ApplicationOutput } from '@/shared/application/output/application-output';

export type GetUrlsByUserIdUseCaseInput = {
  userId: string;
};

@Injectable()
export class GetUrlsByUserIdUseCase {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  async execute(
    input: GetUrlsByUserIdUseCaseInput,
  ): Promise<ApplicationOutput<{ urls: ShortUrlEntity[] }>> {
    if (!input.userId) throw new BadGatewayException();

    const urls = await this.shortUrlService.getByUserId(input.userId);

    return new ApplicationOutput({ urls });
  }
}
