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
import { of } from 'rxjs';

import { Highlight } from '../models/highlight.model';
import { Lex } from '../models/lex.model';
import { FileHighlighterService } from './services/file-highlighter.service';

@Controller('file-highlighter')
export class FileHighlighterController {

    constructor(private fileHighlighterService: FileHighlighterService, private httpService: HttpService) { }

    @Get()
    async highlightText(@Query() query: { sourceText: string, language: string }): Promise<any> {

        const languages = ["python", "java", "kotlin"]

        if (languages.includes(query.language)) {
            const syntaxHighlighterParams = `?text=${query.sourceText}&type=${query.language}`;

            const lexData = (await this.httpService.get(`http://formalSyntaxHighlighter:8080/lex-string${syntaxHighlighterParams}`).toPromise()).data as Lex[];
            const highLightData = (await this.httpService.get(`http://formalSyntaxHighlighter:8080/highlight-string${syntaxHighlighterParams}`).toPromise()).data as Highlight[];
            // TODO Nicolas: connect to proper ml classifier endpoint and pass lexData
            const mlClassifierData = (await this.httpService.get("http://mlclassifier:3000/").toPromise()).data;

            return of({
                "source-code": query.sourceText,
                "formal-formatting": highLightData,
                "ml-formatting": mlClassifierData
            }).toPromise()
        } else {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Text language not supported! Please choose python, java or kotlin' }, HttpStatus.BAD_REQUEST);
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
}
