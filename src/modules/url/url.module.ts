import { Module } from '@nestjs/common';
import { UrlService } from './application/services/url.service';

@Module({
  providers: [UrlService],
})
export class UrlModule {}
