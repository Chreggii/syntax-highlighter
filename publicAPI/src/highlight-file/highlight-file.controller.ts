import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable } from "rxjs";

import { HighlightedTextResponse } from "../models/highlighted-text.model";
import { HighlightService } from "../services/highlight/highlight.service";

@Controller("highlight-file")
export class HighlightFileController {
  constructor(private highlightService: HighlightService) {}

  /** Highlights a file.
   * @param file - The file which should be highlighted.
   * @param body - The body contains the desired color mode of the highlighting.
   * @returns - Returns the result from the ML Classifier, Formal Syntax Highlighter and the passed source code.
   */
  @Post()
  @UseInterceptors(FileInterceptor("file", { dest: "uploads" }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body?: { mode?: string }
  ): Observable<HighlightedTextResponse> {
    const language = this.highlightService.getLanguage(file.originalname);
    const sourceText = this.highlightService.getFileContent(file.path);

    this.highlightService.deleteFile(file.path);

    if (language) {
      return this.highlightService.highlight(
        sourceText,
        language,
        body?.mode
      ) as Observable<HighlightedTextResponse>;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "File extension not supported!",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
