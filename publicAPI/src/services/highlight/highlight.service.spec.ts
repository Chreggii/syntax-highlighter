import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { mockHttpService } from '../../../test/helpers/mock-http-service';
import { HighlightService } from './highlight.service';

describe("HighlightService", () => {
  let service: HighlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HighlightService, { provide: HttpService, useValue: mockHttpService }],
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

  it("should return error if language not supported", () => {
    try {
      service.highlight('print("test")', 'typescript');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.error).toStrictEqual('Text language not supported! Please choose python, java or kotlin');
    }
  });

  it("should return correct response", () => {
    service.highlight('print("test")', 'python').subscribe(response => {
      expect(response).toStrictEqual({
        "sourceCode": "print(\"test\")",
        "formalFormatting": [{ "hexcode": "#000000", "startIndex": 0, "endIndex": 1 }, { "hexcode": "#7f0055", "startIndex": 2, "endIndex": 4 }],
        "mlFormatting": [{ "hexcode": "#000000", "startIndex": 0, "endIndex": 1 }, { "hexcode": "#7f0055", "startIndex": 2, "endIndex": 4 }]
      })
    });
  });

  it("should return correct html response", () => {
    service.highlight('print("test")', 'python', "classic", true).subscribe(response => {
      expect(response).toStrictEqual({
        "sourceCode": "print(\"test\")",
        "formalFormatting": "<span style=\"color:red\">Test<span>",
        "mlFormatting": "<span style=\"color:red\">Test<span>"
      })
    });
  });
});
