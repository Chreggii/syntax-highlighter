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
import { ColorScheme } from "src/models/colorScheme.model";

@Controller("h-code-value")
export class HCodeValuesController {
  constructor(private httpService: HttpService) {}

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
    console.log(query.mode);
    console.log(value);
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
                color: this.getColor(colors.data, value)
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
  }

  private getColor(colors: [ColorScheme], value: HCodeValue): string {
    let hexcode = "";
    for (let i=0; i < colors.length; i++){
      if(colors[i]["hCodeValue"] === Number(value)){
        hexcode = colors[i]["hexcode"];
      }
    }

    if(hexcode){
      return hexcode;
    }
    else{
      return "Error! color not found for " + value;
    }
  }
}
