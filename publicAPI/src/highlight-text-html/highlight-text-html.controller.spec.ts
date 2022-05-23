import { Test, TestingModule } from "@nestjs/testing";
import { HighlightTextHtmlController } from "./highlight-text-html.controller";

describe("HighlightTextHtmlController", () => {
  let controller: HighlightTextHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighlightTextHtmlController],
    }).compile();

    controller = module.get<HighlightTextHtmlController>(
      HighlightTextHtmlController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
