import { Test, TestingModule } from '@nestjs/testing';

import { FileHighlighterController } from './file-highlighter.controller';
import { FileHighlighterService } from './services/file-highlighter.service';

describe('FileHighlighterController', () => {
  let controller: FileHighlighterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileHighlighterController],
      providers: [FileHighlighterService]
    }).compile();

    controller = module.get<FileHighlighterController>(FileHighlighterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
