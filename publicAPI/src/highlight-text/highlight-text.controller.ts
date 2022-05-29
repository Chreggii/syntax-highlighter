import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";

import { HighlightedTextResponse } from "../models/highlighted-text.model";
import { HighlightService } from "../services/highlight/highlight.service";

@Controller("highlight-text")
export class HighlightTextController {
  constructor(private highlightService: HighlightService) {}

  /** Highlights a sourceText
   * @param body - The body contains the sourceText, the language of the sourceText and the desired color mode of the highlighting.
   * @returns - Returns the result from the ML Classifier, Formal Syntax Highlighter and the passed source code.
   */
  @Post()
  highlightText(
    @Body() body: { sourceText: string; language: string; mode?: string }
  ): Observable<HighlightedTextResponse> {
    return this.highlightService.highlight(
      body.sourceText,
      body.language,
      body.mode
    ) as Observable<HighlightedTextResponse>;
  }
}
