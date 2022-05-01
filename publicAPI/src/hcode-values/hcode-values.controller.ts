import { Controller, Get, HttpException, HttpService, HttpStatus, Param } from '@nestjs/common';
import { of } from 'rxjs';
import { HCodeValue } from 'src/models/hCodeValue.type';
import { HCodeValues } from 'src/models/hCodeValues.model';

@Controller("h-code-value")
export class HCodeValuesController {
  constructor(private httpService: HttpService) { }

  @Get()
  async getAllHCodeValues(): Promise<any> {
    const hCodeValues = (
      await this.httpService
        .get(`http://formalSyntaxHighlighter:8080/highlighting-codes`)
        .toPromise()
    ).data as HCodeValues[];

    return of(hCodeValues).toPromise();
  }

  @Get(":value")
  async getHCodeValue(@Param("value") value: HCodeValue): Promise<any> {
    const hCodeValues = (
      await this.httpService
        .get(`http://formalSyntaxHighlighter:8080/highlighting-codes`)
        .toPromise()
    ).data as HCodeValues[];

    let hCodeName = "";
    for (let i = 0; i < hCodeValues.length; i++) {
      if (hCodeValues[i]["hCodeValue"] === Number(value)) {
        hCodeName = hCodeValues[i]["name"];
      }
    }

    if (hCodeName) {
      return of({
        name: hCodeName,
        hCodeValue: value,
        color: "color",
      }).toPromise();
    } else {
      throw new HttpException(
        {
          error: "HCode for " + value + " does not exist.",
        },
        HttpStatus.NOT_FOUND
      );
    }
  }
}
