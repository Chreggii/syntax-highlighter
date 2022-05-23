import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HighlightFileHtmlController } from "./highlight-file-html/highlight-file-html.controller";
import { HighlightFileController } from "./highlight-file/highlight-file.controller";
import { HighlightTextHtmlController } from "./highlight-text-html/highlight-text-html.controller";
import { HighlightTextController } from "./highlight-text/highlight-text.controller";
import { HighlightService } from "./services/highlight/highlight.service";

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    HighlightTextController,
    HighlightFileController,
    HighlightFileHtmlController,
    HighlightTextHtmlController,
  ],
  providers: [AppService, HighlightService],
})
export class AppModule {}
