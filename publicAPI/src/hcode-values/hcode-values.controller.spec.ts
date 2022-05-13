import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";

import { HCodeValuesService } from "../services/hcode-values/hcode-values.service";
import { HCodeValuesController } from "./hcode-values.controller";

describe("HCodeValuesController", () => {
  let controller: HCodeValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpService],
      providers: [HCodeValuesService],
      controllers: [HCodeValuesController],
    }).compile();

    controller = module.get<HCodeValuesController>(HCodeValuesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
