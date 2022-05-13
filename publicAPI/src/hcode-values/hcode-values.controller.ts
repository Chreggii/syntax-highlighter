import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { HCodeValue } from "src/models/hCodeValue.type";
import { HCodeValues } from "src/models/hCodeValues.model";
import { Mode } from "src/models/mode.type";
import { HcodeValuesService } from "src/services/hcode-values/hcode-values.service"

@Controller("h-code-value")
export class HCodeValuesController {
  constructor(private hCodeValuesService: HcodeValuesService, private httpService: HttpService) {}

  @Get()
  getAllHCodeValues(): Observable<HCodeValues[]> {
    return this.httpService
      .get<HCodeValues[]>(
        `http://formalSyntaxHighlighter:8080/highlighting-codes`
      )
      .pipe(map((response) => response.data));
  }

  @Get(":value")
  getHCodeValue(
    @Param("value") value : HCodeValue, @Query() query:  {mode: Mode}
  ): Observable<any> {
    const modes = ["dark", "classic", "dracula"];

    if(!query.mode){
      throw new HttpException(
       {
         error: "A parameter 'mode' should be defined. Please choose between dark, dracula or classic.",
       },
       HttpStatus.BAD_REQUEST
     );
    }

    if(modes.includes(query.mode)){
      return this.httpService
        .get<HCodeValues[]>(
          `http://formalSyntaxHighlighter:8080/highlighting-codes`
        )
        .pipe(
          map((response) => response.data),
          map(
            (hCodeValues) =>
              hCodeValues.find((item) => item.hCodeValue === Number(value))?.name
          ),
          switchMap((hCodeName) =>
            hCodeName
              ? this.httpService.get('http://hCode_colorizer:3030/color-scheme?mode='+ query.mode).pipe(
                map(colors => ({
                  name: hCodeName,
                  hCodeValue: value,
                  color: this.hCodeValuesService.getColor(colors.data, value)
                }))
              )
              : of({}).pipe(
                  tap(() => {
                    throw new HttpException(
                      {
                        error: "HCode for " + value + " does not exist.",
                      },
                      HttpStatus.NOT_FOUND
                    );
                  })
                )
          )
        );
    } else {
       throw new HttpException(
        {
          error: "Mode " + query.mode + " does not exist. Please choose between dark, dracula or classic.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
