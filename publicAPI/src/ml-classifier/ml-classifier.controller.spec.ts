import { Test, TestingModule } from '@nestjs/testing';

import { MlClassifierController } from './ml-classifier.controller';

describe('MlClassifierController', () => {
  let controller: MlClassifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MlClassifierController],
    }).compile();

    controller = module.get<MlClassifierController>(MlClassifierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
