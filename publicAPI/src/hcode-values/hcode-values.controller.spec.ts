import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";

import { HCodeValuesController } from "./hcode-values.controller";

describe("HCodeValuesController", () => {
  let controller: HCodeValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [HCodeValuesController],
    }).compile();

    controller = module.get<HCodeValuesController>(HCodeValuesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});