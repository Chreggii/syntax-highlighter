import { HttpService } from "@nestjs/axios";
import { Controller, Get } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Controller("ml-classifier")
export class MlClassifierController {
  constructor(private httpService: HttpService) {}

  @Get()
  classify(): Observable<string> {
    // TODO CH: Remove at the end of the project
    return this.httpService
      .get("http://mlclassifier:3000/ml-highlight")
      .pipe(
        map(
          (response) =>
            "The following data was received from the Formal Syntax Highlighter:\n\n" +
            response.data
        )
      );
  }
}
