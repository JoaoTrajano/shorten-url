import { Test, TestingModule } from '@nestjs/testing';
import { ShortURLController } from '../../short-url.controller';

describe('UrlController', () => {
  let controller: ShortURLController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortURLController],
    }).compile();

    controller = module.get<ShortURLController>(ShortURLController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
