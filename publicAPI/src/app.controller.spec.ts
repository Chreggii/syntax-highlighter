import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileHighlighterController } from './file-highlighter/file-highlighter.controller';
import { FileHighlighterService } from './file-highlighter/services/file-highlighter.service';
import { FormalSyntaxHighlighterController } from './formal-syntax-highlighter/formal-syntax-highlighter.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController, FormalSyntaxHighlighterController, FileHighlighterController],
      providers: [AppService, FileHighlighterService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hi from the public API"', () => {
      expect(appController.getHello()).toBe('Hi from the public API');
    });
  });
});
