import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { HighlightService } from '../services/highlight/highlight.service';

@Controller('highlight-text')
export class HighlightTextController {
  constructor(
    private highlightService: HighlightService,
  ) { }

  @Post()
  highlightText(
    @Body() body: { sourceText: string; language: string }
  ): Observable<any> {
    return this.highlightService.highlight(body.sourceText, body.language);
  }
}
