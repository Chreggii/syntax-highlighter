import { Controller, Get, HttpService } from '@nestjs/common';

@Controller('ml-classifier')
export class MlClassifierController {

    constructor(private httpService: HttpService) { }

    @Get()
    async classify(): Promise<string> {
        const response = await this.httpService.get('http://mlclassifier:3000/').toPromise();
        return "The followind data was received from the Formal Syntax Highlighter:\n\n" + response.data;
    }
}
