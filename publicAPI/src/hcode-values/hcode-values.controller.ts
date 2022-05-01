import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { HCodeValue } from "src/models/hCodeValue.type";
import { HCodeValues } from "src/models/hCodeValues.model";

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
  getHCodeValue(@Param("value") value: HCodeValue): Observable<any> {
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
            ? of({
                name: hCodeName,
                hCodeValue: value,
                color: "color",
              })
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
}
