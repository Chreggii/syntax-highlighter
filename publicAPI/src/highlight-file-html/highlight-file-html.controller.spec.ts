import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { HighlightService } from '../services/highlight/highlight.service';
import { HighlightFileHtmlController } from './highlight-file-html.controller';

describe("HighlightFileHtmlController", () => {
  let controller: HighlightFileHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HighlightFileHtmlController],
      providers: [HighlightService]
    }).compile();

    controller = module.get<HighlightFileHtmlController>(
      HighlightFileHtmlController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
