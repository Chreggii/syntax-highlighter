import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormalSyntaxHighlighterController } from './formal-syntax-highlighter/formal-syntax-highlighter.controller';
import { MsClassifierController } from './ms-classifier/ms-classifier.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, MsClassifierController, FormalSyntaxHighlighterController],
  providers: [AppService],
})
export class AppModule { }
