import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileHighlighterController } from './file-highlighter/file-highlighter.controller';
import { FileHighlighterService } from './file-highlighter/services/file-highlighter.service';
import { FormalSyntaxHighlighterController } from './formal-syntax-highlighter/formal-syntax-highlighter.controller';
import { MlClassifierController } from './ml-classifier/ml-classifier.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, MlClassifierController, FormalSyntaxHighlighterController, FileHighlighterController],
  providers: [AppService, FileHighlighterService],
})
export class AppModule { }
