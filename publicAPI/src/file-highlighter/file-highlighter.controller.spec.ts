import { Test, TestingModule } from '@nestjs/testing';
import { FileHighlighterController } from './file-highlighter.controller';

describe('FileHighlighterController', () => {
  let controller: FileHighlighterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileHighlighterController],
    }).compile();

    controller = module.get<FileHighlighterController>(FileHighlighterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
