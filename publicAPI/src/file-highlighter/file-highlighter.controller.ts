import { Controller, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';

import { SupportedLanguages } from '../models/language.type';
import { FileHighlighterService } from './services/file-highlighter.service';

@Controller('file-highlighter')
export class FileHighlighterController {

    constructor(private fileHighlighterService: FileHighlighterService) { }

    @Get()
    highlightText(@Query() query: { sourceText: string, language: SupportedLanguages }): Promise<any> {
        // TODO Eleonora: here comes your code
        console.log(query);
        return of(undefined).toPromise();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', { dest: 'uploads' }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        const language = this.fileHighlighterService.getLanguage(file.originalname);
        const sourceText = this.fileHighlighterService.getFileContent(file.path);

        this.fileHighlighterService.deleteFile(file.path);

        if (language) {
            return this.highlightText({ sourceText, language });
        } else {
            throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'File extension not supported!' }, HttpStatus.FORBIDDEN);
        }
    }
}
