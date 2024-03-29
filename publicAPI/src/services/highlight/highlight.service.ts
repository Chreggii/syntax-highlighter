import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { catchError, forkJoin, map, Observable, switchMap, throwError } from 'rxjs';

import { HighlightRowData } from '../../models/highlight-row-data.model';
import { HighlightedTextHTMLResponse } from '../../models/highlighted-text-html.model';
import { HighlightedTextResponse } from '../../models/highlighted-text.model';
import { SupportedLanguages } from '../../models/language.type';
import { MlFormattingResponse } from '../../models/ml-formatting-response.model';

@Injectable()
export class HighlightService {
  constructor(private httpService: HttpService) { }

  /** Highlights a passed source text
   * @param sourceText - The source text which should be highlighted
   * @param language - The language of the source text
   * @param mode - The desired color mode of the highlighting
   * @param htmlResponse - A boolean which defines if the result should be return as HTML code
   * @returns - Returns the result from the ML Classifier, Formal Syntax Highlighter and the passed source code.
   */
  highlight(
    sourceText: string,
    language: string,
    mode = "classic",
    htmlResponse = false
  ): Observable<HighlightedTextResponse | HighlightedTextHTMLResponse> {
    const languages = ["python", "java", "kotlin"];

    const modes = ["dark", "dracula", "classic"];

    if (languages.includes(language)) {
      if (modes.includes(mode)) {
        const body = { text: sourceText, type: language };
        // Fire & Forget - Triggers modal learning
        this.httpService
          .put(`http://mlclassifier:3000/ml-train`, {
            text: sourceText,
            type: language,
          })
          .pipe(
            catchError((error) =>
              throwError(
                this.getException(error, "http://mlclassifier:3000/ml-train")
              )
            )
          )
          .subscribe();

        return forkJoin({
          formalFormatting: this.httpService
            .post<HighlightRowData[]>(
              `http://formalSyntaxHighlighter:8080/highlight-string`,
              body
            )
            .pipe(
              catchError((error) =>
                throwError(
                  this.getException(
                    error,
                    "http://formalSyntaxHighlighter:8080/highlight-string"
                  )
                )
              )
            ),
          mlFormatting: this.httpService
            .post<MlFormattingResponse>(
              `http://mlclassifier:3000/ml-highlight`,
              body
            )
            .pipe(
              catchError((error) =>
                throwError(
                  this.getException(
                    error,
                    "http://mlclassifier:3000/ml-highlight"
                  )
                )
              )
            ),
        }).pipe(
          switchMap(({ formalFormatting, mlFormatting }) =>
            this.getColorizerRequest(
              htmlResponse,
              mode,
              formalFormatting,
              body.text,
              mlFormatting
            )
          ),
          map(({ formalFormatting, mlFormatting }) => ({
            sourceCode: sourceText,
            formalFormatting: formalFormatting.data,
            mlFormatting: mlFormatting.data,
          }))
        );
      } else {
        // Throw exception in case wrong mode is passed
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
      // Throw exception in case language is not supported
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

  /** Get language of file
   * @param filename - The file name
   * @returns - Return the program language of the file. If the file is not supported, undefined will be returned.
   */
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

  /** Reads the content of a file
   * @param filePath - The path of the file
   * @returns - Returns the content of the file.
   */
  getFileContent(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
  }

  /** Deletes a file
   * @param filePath - The path of the file
   */
  deleteFile(filePath: string): void {
    fs.unlinkSync(filePath);
  }

  private getColorizerRequest(
    htmlResponse: boolean,
    mode: string,
    formalFormatting: any,
    text: string,
    mlFormatting: any
  ) {
    return forkJoin({
      formalFormatting: this.httpService.post(
        `http://hCode_colorizer:3030/color-text${htmlResponse ? "-html" : ""
        }?mode=${mode}`,
        htmlResponse
          ? { hCodes: formalFormatting.data, text }
          : formalFormatting.data
      ),
      mlFormatting: this.httpService.post(
        `http://hCode_colorizer:3030/color-text${htmlResponse ? "-html" : ""
        }?mode=${mode}`,
        htmlResponse
          ? {
            hCodes: this.mapMLFormattingResponse(mlFormatting.data),
            text,
          }
          : this.mapMLFormattingResponse(mlFormatting.data)
      ),
    }).pipe(
      catchError((error) =>
        throwError(
          this.getException(
            error,
            `http://hCode_colorizer:3030/color-text${htmlResponse ? "-html" : ""
            }?mode = ${mode} `
          )
        )
      )
    );
  }

  private mapMLFormattingResponse(
    mlResponse: MlFormattingResponse
  ): HighlightRowData[] {
    return mlResponse.lexingData.map((data, index) => ({
      ...data,
      hCodeValue: mlResponse.hCodeValues[index],
    }));
  }

  private getException(error: any, message: string): HttpException {
    return new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `Error from ${message} -> ${error}`,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
