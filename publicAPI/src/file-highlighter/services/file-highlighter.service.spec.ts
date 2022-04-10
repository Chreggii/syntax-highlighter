import { Test, TestingModule } from "@nestjs/testing";

import { FileHighlighterService } from "./file-highlighter.service";

describe("FileHighlighterService", () => {
  let service: FileHighlighterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileHighlighterService],
    }).compile();

    service = module.get<FileHighlighterService>(FileHighlighterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return the correct language", () => {
    expect(service["getLanguage"]("text.java")).toBe("java");
    expect(service["getLanguage"]("text.py")).toBe("python");
    expect(service["getLanguage"]("text.kt")).toBe("kotlin");
    expect(service["getLanguage"]("text.kts")).toBe("kotlin");
    expect(service["getLanguage"]("text.kts")).toBe("kotlin");
    expect(service["getLanguage"]("text.csv")).toBe(undefined);
  });
});
