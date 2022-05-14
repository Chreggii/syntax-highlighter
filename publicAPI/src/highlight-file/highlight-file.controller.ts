import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { HighlightService } from '../services/highlight/highlight.service';

@Controller('highlight-file')
export class HighlightFileController {
  constructor(
    private highlightService: HighlightService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor("file", { dest: "uploads" }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const language = this.highlightService.getLanguage(file.originalname);
    const sourceText = this.highlightService.getFileContent(file.path);

    this.highlightService.deleteFile(file.path);

    if (language) {
      return this.highlightService.highlight(sourceText, language);
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