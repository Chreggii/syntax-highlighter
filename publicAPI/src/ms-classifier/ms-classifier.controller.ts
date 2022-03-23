import { Controller, Get, HttpService } from '@nestjs/common';

@Controller('ms-classifier')
export class MsClassifierController {

    constructor(private httpService: HttpService) { }

    @Get()
    async classify(): Promise<string> {
        const response = await this.httpService.get('http://formalSyntaxHighlighter:8080/').toPromise();
        return "The followind data was received from the Formal Syntax Highlighter:\n\n" + response.data;
    }
}
