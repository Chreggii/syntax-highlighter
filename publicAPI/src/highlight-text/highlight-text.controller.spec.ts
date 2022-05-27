import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { mockHttpService, testFormatting } from '../../test/helpers/mock-http-service';
import { HighlightService } from '../services/highlight/highlight.service';
import { HighlightTextController } from './highlight-text.controller';

describe("HighlightTextController", () => {
  let controller: HighlightTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HighlightTextController],
      providers: [
        HighlightService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get<HighlightTextController>(HighlightTextController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return result when language is supported", async () => {
    controller
      .highlightText({ sourceText: `printf('test')`, language: "python", mode: "classic" })
      .subscribe((response) => {
        expect(response.sourceCode).toBe(`printf('test')`);
        expect(response.formalFormatting).toStrictEqual(testFormatting);
        expect(response.mlFormatting).toStrictEqual(testFormatting);
      });
  });

  it("should return error when language not supported", async () => {
    try {
      controller
        .highlightText({ sourceText: `printf('test')`, language: "test", mode: "classic" })
        .subscribe();
    } catch (error) {
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }

    try {
      controller
        .highlightText({ sourceText: `printf('test')`, language: "", mode: "classic" })
        .subscribe();
    } catch (error) {
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
