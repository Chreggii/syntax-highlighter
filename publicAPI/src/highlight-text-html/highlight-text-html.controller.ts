import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";

import { HighlightedTextHTMLResponse } from "../models/highlighted-text-html.model";
import { HighlightService } from "../services/highlight/highlight.service";

@Controller("highlight-text-html")
export class HighlightTextHtmlController {
  constructor(private highlightService: HighlightService) {}

  /** Highlights a sourceText with HTML response
   * @param body - The body contains the sourceText, the language of the sourceText and the desired color mode of the highlighting.
   * @returns - Returns the result from the ML Classifier, Formal Syntax Highlighter as HTML code and the passed source code.
   */
  @Post()
  highlightText(
    @Body() body: { sourceText: string; language: string; mode?: string }
  ): Observable<HighlightedTextHTMLResponse> {
    return this.highlightService.highlight(
      body.sourceText,
      body.language,
      body.mode,
      true
    ) as Observable<HighlightedTextHTMLResponse>;
  }
}
