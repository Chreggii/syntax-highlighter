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

import { FileHighlighterService } from './services/file-highlighter.service';

@Controller('file-highlighter')
export class FileHighlighterController {

    constructor(private fileHighlighterService: FileHighlighterService, private httpService: HttpService) { }

    @Get()
    async highlightText(@Query() query: { sourceText: string, language: string }): Promise<any> {

        const languages = ["python", "java", "kotlin"]

        if (languages.includes(query.language)) {
            const responseSpring = (await this.httpService.get("http://formalSyntaxHighlighter:8080/").toPromise()).data;
            const responseFlask = (await this.httpService.get("http://mlclassifier:3000/").toPromise()).data;

            const response = {
                "source-code": query.sourceText,
                "formal-formatting": responseSpring,
                "ml-formatting": responseFlask
            }

            return of(response).toPromise();
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
