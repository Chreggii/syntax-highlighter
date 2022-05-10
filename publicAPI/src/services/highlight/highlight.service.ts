import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { forkJoin, map } from 'rxjs';

import { SupportedLanguages } from '../../models/language.type';

@Injectable()
export class HighlightService {
  constructor(private httpService: HttpService) { }

  highlight(sourceText: string, language: string) {
    const languages = ["python", "java", "kotlin"];

    if (languages.includes(language)) {
      const body = { text: sourceText, type: language };

      // Fire & Forget
      this.httpService
        .put(`http://mlclassifier:3000/ml-train`, {
          text: sourceText,
          type: language,
        })
        .subscribe();

      return forkJoin({
        formalFormatting: this.httpService.post(
          `http://formalSyntaxHighlighter:8080/highlight-string`,
          body
        ),
        mlFormatting: this.httpService.post(
          `http://mlclassifier:3000/ml-highlight`,
          body
        ),
      }).pipe(
        map(({ formalFormatting, mlFormatting }) => ({
          "source-code": sourceText,
          "formal-formatting": formalFormatting.data,
          "ml-formatting": mlFormatting.data,
        }))
      );
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
}
