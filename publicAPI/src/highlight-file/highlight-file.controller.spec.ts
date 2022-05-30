import { HttpModule, HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";

import { mockHttpService } from "../../test/helpers/mock-http-service";
import { invalidTestFile, testFile } from "../../test/helpers/test-files";
import { HighlightService } from "../services/highlight/highlight.service";
import { HighlightFileController } from "./highlight-file.controller";

describe("HighlightFileController", () => {
  let controller: HighlightFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        HighlightService,
        { provide: HttpService, useValue: mockHttpService },
      ],
      controllers: [HighlightFileController],
    }).compile();

    controller = module.get<HighlightFileController>(HighlightFileController);
    const highlightService = module.get<HighlightService>(HighlightService);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    highlightService.deleteFile = () => {};
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return error if language not supported", () => {
    try {
      controller.uploadFile(invalidTestFile as any).subscribe();
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.error).toBe("File extension not supported!");
    }
  });

  it("should return correct result", () => {
    controller.uploadFile(testFile as any).subscribe((response) => {
      expect(response).toStrictEqual(expectedResult);
    });
  });
});

const expectedResult = {
  sourceCode: 'print("test")\r\n',
  formalFormatting: [
    { hexcode: "#000000", startIndex: 0, endIndex: 1 },
    { hexcode: "#7f0055", startIndex: 2, endIndex: 4 },
  ],
  mlFormatting: [
    { hexcode: "#000000", startIndex: 0, endIndex: 1 },
    { hexcode: "#7f0055", startIndex: 2, endIndex: 4 },
  ],
};
