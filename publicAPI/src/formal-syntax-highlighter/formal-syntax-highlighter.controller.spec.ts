import { Test, TestingModule } from '@nestjs/testing';
import { FormalSyntaxHighlighterController } from './formal-syntax-highlighter.controller';

describe('FormalSyntaxHighlighterController', () => {
  let controller: FormalSyntaxHighlighterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormalSyntaxHighlighterController],
    }).compile();

    controller = module.get<FormalSyntaxHighlighterController>(FormalSyntaxHighlighterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
