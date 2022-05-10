import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Controller("formal-syntax-highlighter")
export class FormalSyntaxHighlighterController {
  constructor(private httpService: HttpService) { }

  @Get()
  highlight(): Observable<string> {
    // TODO CH: Remove at the end of the project
    return this.httpService
      .get("http://formalSyntaxHighlighter:8080/")
      .pipe(
        map(
          (response) =>
            "The following data was received from the ML classifier:\n\n" +
            response.data
        )
      );
  }
}
