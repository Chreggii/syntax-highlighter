import { HttpService } from "@nestjs/axios";
import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";

import { FileHighlighterController } from "./file-highlighter.controller";
import { FileHighlighterService } from "./services/file-highlighter.service";

describe("FileHighlighterController", () => {
  let controller: FileHighlighterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileHighlighterController],
      providers: [
        FileHighlighterService,
        {
          provide: HttpService,
          useValue: { get: () => of({ data: [] }), put: () => of() },
        },
      ],
    }).compile();

    controller = module.get<FileHighlighterController>(
      FileHighlighterController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return result when language is supported", async () => {
    controller
      .highlightText({ sourceText: `printf('test')`, language: "python" })
      .subscribe((response) => {
        expect(response["source-code"]).toBe(`printf('test')`);
        expect(response["formal-formatting"]).toStrictEqual([]);
        expect(response["ml-formatting"]).toStrictEqual([]);
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
