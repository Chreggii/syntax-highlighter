import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

import { MlFormattingResponse } from '../models/ml-formatting-response.model';
import { HighlightService } from '../services/highlight/highlight.service';
import { HighlightTextController } from './highlight-text.controller';

describe('HighlightTextController', () => {
  let controller: HighlightTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HighlightTextController],
      providers: [
        HighlightService,
        {
          provide: HttpService,
          useValue: { post: (url: string) => getMockResponse(url), put: () => of() },
        },]
    }).compile();

    controller = module.get<HighlightTextController>(HighlightTextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should return result when language is supported", async () => {
    controller
      .highlightText({ sourceText: `printf('test')`, language: "python" })
      .subscribe((response) => {
        expect(response.sourceCode).toBe(`printf('test')`);
        expect(response.formalFormatting).toStrictEqual(testFormatting);
        expect(response.mlFormatting).toStrictEqual(testFormatting);
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

const getMockResponse = (url: string): Observable<{ data: any }> => {
  if (url === 'http://formalSyntaxHighlighter:8080/highlight-string') {
    return of({ data: [] })
  }
  else if (url === 'http://mlclassifier:3000/ml-highlight') {
    return of({
      data: {
        hCodeValues: [0, 1, 2, 3, 4, 5, 6],
        lexingData: [
          { startIndex: 0, endIndex: 1, tokenId: 1 },
          { startIndex: 1, endIndex: 2, tokenId: 3 },
        ]
      } as MlFormattingResponse
    })
  }
  else if (url === 'http://hCode_colorizer:3030/color-text?mode=classic') {
    return of({
      data: testFormatting
    })
  }
}

const testFormatting = [{ hexcode: '#000000', startIndex: 0, endIndex: 1 }, { hexcode: '#7f0055', startIndex: 2, endIndex: 4 }];
