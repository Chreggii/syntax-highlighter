import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MsClassifierController } from './ms-classifier.controller';

describe('MsClassifierController', () => {
  let controller: MsClassifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MsClassifierController],
    }).compile();

    controller = module.get<MsClassifierController>(MsClassifierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
