import { HttpModule, HttpService } from "@nestjs/axios";
import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import {
  htmlResponse,
  mockHttpService,
} from "../../test/helpers/mock-http-service";
import { HighlightService } from "../services/highlight/highlight.service";
import { HighlightTextHtmlController } from "./highlight-text-html.controller";

describe("HighlightTextHtmlController", () => {
  let controller: HighlightTextHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HighlightTextHtmlController],
      providers: [
        HighlightService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    controller = module.get<HighlightTextHtmlController>(
      HighlightTextHtmlController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return result when language is supported", async () => {
    controller
      .highlightText({ sourceText: `printf('test')`, language: "python" })
      .subscribe((response) => {
        expect(response.sourceCode).toBe(`printf('test')`);
        expect(response.formalFormatting).toStrictEqual(htmlResponse);
        expect(response.mlFormatting).toStrictEqual(htmlResponse);
      });
  });

  it("should return error when language not supported", async () => {
    try {
      controller
        .highlightText({ sourceText: `printf('test')`, language: "test" })
        .subscribe();
    } catch (error) {
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }

    try {
      controller
        .highlightText({ sourceText: `printf('test')`, language: "" })
        .subscribe();
    } catch (error) {
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
