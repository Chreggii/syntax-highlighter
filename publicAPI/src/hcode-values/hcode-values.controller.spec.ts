import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

import { HCodeValuesService } from '../services/hcode-values/hcode-values.service';
import { HCodeValuesController } from './hcode-values.controller';

describe("HCodeValuesController", () => {
  let controller: HCodeValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        HCodeValuesService,
        { provide: HttpService, useValue: { get: (url: string) => handleGetRequests(url) } }],
      controllers: [HCodeValuesController],
    }).compile();

    controller = module.get<HCodeValuesController>(HCodeValuesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("getAllHCodeValues be work", () => {
    controller.getAllHCodeValues().subscribe(value => expect(value).toEqual([
      {"name": "ANY", "hCodeValue": 0}, 
      {"name": "KEYWORD", "hCodeValue": 1}, 
      {"name": "LITERAL", "hCodeValue": 2}, 
      {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3},
      {"name": "COMMENT", "hCodeValue": 4},
      {"name": "CLASS_DECLARATOR", "hCodeValue": 5},
      {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6},
      {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7},
      {"name": "TYPE_IDENTIFIER", "hCodeValue": 8},
      {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9},
      {"name": "FIELD_IDENTIFIER", "hCodeValue": 10},
      {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11}
    ]))
  });
});

const handleGetRequests = (url: string): Observable<{ data: any }> => {
  if (url === 'http://formalSyntaxHighlighter:8080/highlighting-codes') {
    // Return here the mock values
    return of({ data: [
      {"name": "ANY", "hCodeValue": 0}, 
      {"name": "KEYWORD", "hCodeValue": 1}, 
      {"name": "LITERAL", "hCodeValue": 2}, 
      {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3},
      {"name": "COMMENT", "hCodeValue": 4},
      {"name": "CLASS_DECLARATOR", "hCodeValue": 5},
      {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6},
      {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7},
      {"name": "TYPE_IDENTIFIER", "hCodeValue": 8},
      {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9},
      {"name": "FIELD_IDENTIFIER", "hCodeValue": 10},
      {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11}
    ] });
  }
}