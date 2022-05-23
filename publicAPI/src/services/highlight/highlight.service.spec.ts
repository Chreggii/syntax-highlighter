import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";

import { HighlightService } from "./highlight.service";

describe("HighlightService", () => {
  let service: HighlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HighlightService],
    }).compile();

    service = module.get<HighlightService>(HighlightService);
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
