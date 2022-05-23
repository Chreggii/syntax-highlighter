import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

import { HighlightRowData } from '../../models/highlight-row-data.model';
import { HighlightedTextResponse } from '../../models/highlighted-text.model';
import { SupportedLanguages } from '../../models/language.type';
import { MlFormattingResponse } from '../../models/ml-formatting-response.model';
import { Mode } from '../../models/mode.type';

@Injectable()
export class HighlightService {
  constructor(private httpService: HttpService) { }

  highlight(sourceText: string, language: string, mode: string = "classic"): Observable<HighlightedTextResponse> {
    const languages = ["python", "java", "kotlin"];

    const modes = ['dark', 'dracula', 'classic']

    if (languages.includes(language)) {
      if (modes.includes(mode)){
        const body = { text: sourceText, type: language };

        // Fire & Forget
        this.httpService
          .put(`http://mlclassifier:3000/ml-train`, {
            text: sourceText,
            type: language,
          })
          .subscribe();

        return forkJoin({
          formalFormatting: this.httpService.post<HighlightRowData[]>(
            `http://formalSyntaxHighlighter:8080/highlight-string`,
            body
          ),
          mlFormatting: this.httpService.post<MlFormattingResponse>(
            `http://mlclassifier:3000/ml-highlight`,
            body
          ),
        }).pipe(
          switchMap(({ formalFormatting, mlFormatting }) =>
            forkJoin({
              formalFormatting: this.httpService.post('http://hCode_colorizer:3030/color-text?mode=' + mode, formalFormatting.data),
              mlFormatting: this.httpService.post('http://hCode_colorizer:3030/color-text?mode=' + mode, this.mapMLFormattingResponse(mlFormatting.data))
            })),
          map(({ formalFormatting, mlFormatting }) => ({
            sourceCode: sourceText,
            formalFormatting: formalFormatting.data,
            mlFormatting: mlFormatting.data,
          }))
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              "The mode is not supported! Please choose classic, dracula or dark",
          },
          HttpStatus.BAD_REQUEST
        );
      }

    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            "Text language not supported! Please choose python, java or kotlin",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  getLanguage(filename: string): SupportedLanguages | undefined {
    const extension = filename.split(".")[1];
    return [
      { extension: ["java"], language: "java" as SupportedLanguages },
      { extension: ["py"], language: "python" as SupportedLanguages },
      {
        extension: ["kt", "kts", "ktm"],
        language: "kotlin" as SupportedLanguages,
      },
    ].find((obj) => obj.extension.includes(extension))?.language;
  }

  getFileContent(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
  }

  deleteFile(filePath: string): void {
    fs.unlinkSync(filePath);
  }

  private mapMLFormattingResponse(mlResponse: MlFormattingResponse): HighlightRowData[] {
    return mlResponse.lexingData.map((data, index) => ({ ...data, hCodeValue: mlResponse.hCodeValues[index] }));
  }
}
