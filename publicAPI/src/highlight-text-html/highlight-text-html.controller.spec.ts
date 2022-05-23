import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { HighlightService } from '../services/highlight/highlight.service';
import { HighlightTextHtmlController } from './highlight-text-html.controller';

describe("HighlightTextHtmlController", () => {
  let controller: HighlightTextHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HighlightTextHtmlController],
      providers: [HighlightService]
    }).compile();

    controller = module.get<HighlightTextHtmlController>(
      HighlightTextHtmlController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
