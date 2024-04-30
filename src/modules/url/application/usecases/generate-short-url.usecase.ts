import { BadGatewayException, Injectable } from '@nestjs/common';
import { ShortUrlEntity } from '../../domain/entities/short-url.entity';
import { ShortUrlService } from '../services/short-url.service';
import { AuthService } from '@/modules/auth/application/services/auth.service';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { ApplicationOutput } from '@/shared/application/output/application-output';

export type GenerateShortUrlUseCaseInput = {
  url: string;
  token?: string;
};

@Injectable()
export class GenerateShortUrlUseCase {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly authService: AuthService,
  ) {}

  async execute(
    input: GenerateShortUrlUseCaseInput,
  ): Promise<ApplicationOutput<{ shortUrl: ShortUrlEntity }>> {
    if (!input.url) throw new BadGatewayException();
    let user: UserEntity | null = null;
    const shortUrl = new ShortUrlEntity({ urlOriginal: input.url });
    shortUrl.shorten();

    if (input.token) {
      user = (await this.authService.getUserAuthenticate(input.token)).value
        .user;
      shortUrl.user = user;
    }

    const shortUrlCreated = await this.shortUrlService.create(shortUrl);

    return new ApplicationOutput({ shortUrl: shortUrlCreated });
  }
}
