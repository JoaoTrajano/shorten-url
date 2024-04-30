import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GenerateShortUrlUseCase } from '../../application/usecases/generate-short-url.usecase';
import { ShortURLDTO } from '../../dtos/short-url.dto';
import {
  GetUrlOriginByUrlShortUseCase,
  GetUrlsByUserIdUseCase,
  UpdateUrlUseCase,
} from '../../application/usecases';
import { AuthGuard } from '@/guards/auth.guard';

@Controller('url')
export class ShortURLController {
  constructor(
    private readonly updateUrlUseCase: UpdateUrlUseCase,
    private readonly getUrlsByUserIdUseCase: GetUrlsByUserIdUseCase,
    private readonly generateShortUrlUseCase: GenerateShortUrlUseCase,
    private readonly getUrlOriginByUrlShortUseCase: GetUrlOriginByUrlShortUseCase,
  ) {}

  @Post('/short')
  async short(@Req() req: Request) {
    const body: ShortURLDTO = req.body as unknown as ShortURLDTO;
    const output = await this.generateShortUrlUseCase.execute({
      url: body.url,
      token: req.headers['authorization'],
    });
    return output.toHttpResponse();
  }

  @Get('/redirect/:urlShort')
  @Redirect()
  async redirectUrlOrigin(@Param('urlShort') urlShort: string) {
    const output = await this.getUrlOriginByUrlShortUseCase.execute({
      urlShort,
    });

    return {
      url: output.value.shortUrl.urlOriginal,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async list(@Request() req) {
    const output = await this.getUrlsByUserIdUseCase.execute({
      userId: req.user.id,
    });
    return output.toHttpResponse();
  }

  @UseGuards(AuthGuard)
  @Put('/delete/:id')
  async deleteUrl(@Param('id') id: string) {
    const output = await this.updateUrlUseCase.execute({
      id,
      deleteAt: new Date(),
    });
    return output.toHttpResponse();
  }

  @UseGuards(AuthGuard)
  @Put('/change-url-original/:id')
  async changeUrl(@Param('id') id: string, @Body() body: ShortURLDTO) {
    const output = await this.updateUrlUseCase.execute({
      id,
      urlOrigin: body.url,
    });
    return output.toHttpResponse();
  }
}
