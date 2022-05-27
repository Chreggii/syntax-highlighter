import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";

import { HighlightedTextResponse } from "../models/highlighted-text.model";
import { HighlightService } from "../services/highlight/highlight.service";

@Controller("highlight-text")
export class HighlightTextController {
  constructor(private highlightService: HighlightService) {}

  @Post()
  highlightText(
    @Body() body: { sourceText: string; language: string, mode? : string}
  ): Observable<HighlightedTextResponse> {
    return this.highlightService.highlight(
      body.sourceText,
      body.language,
      body.mode
    ) as Observable<HighlightedTextResponse>;
  }
}
