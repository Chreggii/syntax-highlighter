import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormalSyntaxHighlighterController } from './formal-syntax-highlighter/formal-syntax-highlighter.controller';
import { HCodeValuesController } from './hcode-values/hcode-values.controller';
import { HighlightFileController } from './highlight-file/highlight-file.controller';
import { HighlightTextController } from './highlight-text/highlight-text.controller';
import { MlClassifierController } from './ml-classifier/ml-classifier.controller';
import { HighlightService } from './services/highlight/highlight.service';
import { HCodeValuesService } from './services/hcode-values/hcode-values.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    MlClassifierController,
    FormalSyntaxHighlighterController,
    HCodeValuesController,
    HighlightTextController,
    HighlightFileController,
  ],
  providers: [AppService, HighlightService, HCodeValuesService],
})
export class AppModule { }
