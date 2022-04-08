import {
    Controller,
    Get,
    HttpException,
    HttpService,
    HttpStatus,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { catchError, forkJoin, map, throwError } from 'rxjs';

import { Highlight } from '../models/highlight.model';
import { FileHighlighterService } from './services/file-highlighter.service';

@Controller('file-highlighter')
export class FileHighlighterController {

    constructor(private fileHighlighterService: FileHighlighterService, private httpService: HttpService) { }

    @Get()
    async highlightText(@Query() query: { sourceText: string, language: string }): Promise<any> {

        const languages = ["python", "java", "kotlin"]

        if (languages.includes(query.language)) {
            const params = `?text=${query.sourceText}&type=${query.language}`;

            this.httpService.get(`http://mlclassifier:3000/ml-train${params}`).subscribe();

            return forkJoin([
                this.httpService.get<Highlight[]>(`http://formalSyntaxHighlighter:8080/highlight-string${params}`).pipe(catchError(() => throwError(this.throwError(HttpStatus.BAD_REQUEST, 'No response from formal syntax highlighter')))),
                this.httpService.get<number[]>(`http://mlclassifier:3000/ml-highlight${params}`).pipe(catchError(() => throwError(this.throwError(HttpStatus.BAD_REQUEST, 'No response from ml classifier'))))
            ]).pipe(
                map(([formalFormatting, mlFormatting]) => ({
                    "source-code": query.sourceText,
                    "formal-formatting": formalFormatting,
                    "ml-formatting": mlFormatting
                }))
            );
        } else {
            this.throwError(HttpStatus.BAD_REQUEST, 'Text language not supported! Please choose python, java or kotlin');
        }

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
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'File extension not supported!' }, HttpStatus.BAD_REQUEST);
        }
    }

    private throwError(status: HttpStatus, error: string): void {
        throw new HttpException({ status, error }, status);
    }
}
