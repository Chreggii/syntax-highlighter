import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";

import { HighlightService } from "../services/highlight/highlight.service";
import { HighlightFileController } from "./highlight-file.controller";

describe("HighlightFileController", () => {
  let controller: HighlightFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HighlightService],
      controllers: [HighlightFileController],
    }).compile();

    controller = module.get<HighlightFileController>(HighlightFileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
