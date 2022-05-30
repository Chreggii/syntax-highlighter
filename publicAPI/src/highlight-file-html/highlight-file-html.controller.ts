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

import { HighlightedTextHTMLResponse } from "../models/highlighted-text-html.model";
import { HighlightService } from "../services/highlight/highlight.service";

@Controller("highlight-file-html")
export class HighlightFileHtmlController {
  constructor(private highlightService: HighlightService) {}

  /** Highlights a file with HTML response.
   * @param file - The file which should be highlighted.
   * @param body - The body contains desired color mode of the highlighting.
   * @returns - Returns the result from the ML Classifier, Formal Syntax Highlighter as HTML code and the passed source code.
   */
  @Post()
  @UseInterceptors(FileInterceptor("file", { dest: "uploads" }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body?: { mode?: string }
  ): Observable<HighlightedTextHTMLResponse> {
    const language = this.highlightService.getLanguage(file.originalname);
    const sourceText = this.highlightService.getFileContent(file.path);

    this.highlightService.deleteFile(file.path);

    if (language) {
      return this.highlightService.highlight(
        sourceText,
        language,
        body?.mode,
        true
      ) as Observable<HighlightedTextHTMLResponse>;
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
