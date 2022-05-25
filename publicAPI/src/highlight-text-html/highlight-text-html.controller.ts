import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";

import { HighlightedTextHTMLResponse } from "../models/highlighted-text-html.model";
import { HighlightService } from "../services/highlight/highlight.service";

@Controller("highlight-text-html")
export class HighlightTextHtmlController {
  constructor(private highlightService: HighlightService) {}

  @Post()
  highlightText(
    @Body() body: { sourceText: string; language: string; mode?: string }
  ): Observable<HighlightedTextHTMLResponse> {
    return this.highlightService.highlight(
      body.sourceText,
      body.language,
      body.mode
    ) as Observable<HighlightedTextHTMLResponse>;
  }
}
