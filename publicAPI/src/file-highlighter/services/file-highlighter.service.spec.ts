import { Test, TestingModule } from '@nestjs/testing';
import { FileHighlighterService } from './file-highlighter.service';

describe('FileHighlighterService', () => {
  let service: FileHighlighterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileHighlighterService],
    }).compile();

    service = module.get<FileHighlighterService>(FileHighlighterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
