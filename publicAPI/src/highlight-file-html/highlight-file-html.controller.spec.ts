import { Test, TestingModule } from "@nestjs/testing";
import { HighlightFileHtmlController } from "./highlight-file-html.controller";

describe("HighlightFileHtmlController", () => {
  let controller: HighlightFileHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighlightFileHtmlController],
    }).compile();

    controller = module.get<HighlightFileHtmlController>(
      HighlightFileHtmlController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
