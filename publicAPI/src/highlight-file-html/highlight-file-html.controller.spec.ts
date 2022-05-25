import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { htmlResponse, mockHttpService } from '../../test/helpers/mock-http-service';
import { invalidTestFile, testFile } from '../../test/helpers/test-files';
import { HighlightService } from '../services/highlight/highlight.service';
import { HighlightFileHtmlController } from './highlight-file-html.controller';

describe("HighlightFileHtmlController", () => {
  let controller: HighlightFileHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HighlightFileHtmlController],
      providers: [HighlightService, { provide: HttpService, useValue: mockHttpService }],
    }).compile();

    controller = module.get<HighlightFileHtmlController>(
      HighlightFileHtmlController
    );
    const highlightService = module.get<HighlightService>(HighlightService);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    highlightService.deleteFile = () => { };
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return error if language not supported", () => {
    try {
      controller.uploadFile(invalidTestFile as any).subscribe();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.error).toBe('File extension not supported!')
    }
  });

  it("should return correct result", () => {
    controller.uploadFile(testFile as any).subscribe(response => {
      expect(response).toStrictEqual(expectedResult);
    });
  });
});

const expectedResult = {
  "sourceCode": "print(\"test\")\r\n",
  "formalFormatting": htmlResponse,
  "mlFormatting": htmlResponse
}
