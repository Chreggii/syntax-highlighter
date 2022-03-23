import { Controller, Get, HttpService } from '@nestjs/common';

@Controller('formal-syntax-highlighter')
export class FormalSyntaxHighlighterController {

    constructor(private httpService: HttpService) { }

    @Get()
    async highlight(): Promise<string> {
        const response = await this.httpService.get('http://mlclassifier:3000/').toPromise();
        return "The followind data was received from the ML classifier:\n\n" + response.data;
    }
}
