import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GenerateShortUrlUseCase } from '../../application/usecases/generate-short-url.usecase';
import { ShortURLDTO } from '../../dtos/short-url.dto';

@Controller('url')
export class ShortURLController {
  constructor(
    private readonly generateShortUrlUseCase: GenerateShortUrlUseCase,
  ) {}

  @Post('/short')
  async short(@Req() req: Request) {
    const body: ShortURLDTO = req.body;
    const output = await this.generateShortUrlUseCase.execute({
      url: body.url,
      token: req.headers['authorization'],
    });
    return output.toHttpResponse();
  }
}
