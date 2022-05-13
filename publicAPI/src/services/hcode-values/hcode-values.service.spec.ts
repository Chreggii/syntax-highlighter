import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { HCodeValuesService } from './hcode-values.service';

describe('HCodeValuesService', () => {
  let service: HCodeValuesService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HCodeValuesService],
    }).compile();

    service = module.get<HCodeValuesService>(HCodeValuesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  const dark_colors = [
    {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},
    {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#ff8800"},
    {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#add8e6"},
    {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
    {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#A9A9A9"},
    {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#ff8800"},
    {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#ffcd01"},
    {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
    {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"},
    {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},
    {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},
    {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#ffff00"}
];

const dracula_colors = [
  {"name": "ANY", "hCodeValue": 0, "hexcode": "#ffffff"},
  {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#8becfd"}, 
  {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#f1fa8c"},
  {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#f1fa8c"},
  {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#6272a4"}, 
  {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#8becfd"}, 
  {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#8becfd"},  
  {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#1870d5"},
  {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "#ffffff"}, 
  {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#8becfd"}, 
  {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#8becfd"},
  {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#6272a4"}
];

const classic_colors = [
  {"name": "ANY", "hCodeValue": 0, "hexcode": "#000000"},
  {"name": "KEYWORD", "hCodeValue": 1, "hexcode": "#7f0055"},
  {"name": "LITERAL", "hCodeValue": 2, "hexcode": "#1f7199"},
  {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3, "hexcode": "#006400"},
  {"name": "COMMENT", "hCodeValue": 4, "hexcode": "#888888"},
  {"name": "CLASS_DECLARATOR", "hCodeValue": 5, "hexcode": "#880000"}, 
  {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6, "hexcode": "#880000"}, 
  {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7, "hexcode": "#000000"},
  {"name": "TYPE_IDENTIFIER", "hCodeValue": 8, "hexcode": "##1f7199"},
  {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9, "hexcode": "#ffcd01"},
  {"name": "FIELD_IDENTIFIER", "hCodeValue": 10, "hexcode": "#ffcd01"},
  {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11, "hexcode": "#1f7199"}
];

  it("should return the correct color", () => {
    // check for all the dark colors
    expect(service["getColor"](dark_colors, 0)).toBe(dark_colors[0]["hexcode"]);
    expect(service["getColor"](dark_colors, 1)).toBe(dark_colors[1]["hexcode"]);
    expect(service["getColor"](dark_colors, 2)).toBe(dark_colors[2]["hexcode"]);
    expect(service["getColor"](dark_colors, 3)).toBe(dark_colors[3]["hexcode"]);
    expect(service["getColor"](dark_colors, 4)).toBe(dark_colors[4]["hexcode"]);
    expect(service["getColor"](dark_colors, 5)).toBe(dark_colors[5]["hexcode"]);
    expect(service["getColor"](dark_colors, 6)).toBe(dark_colors[6]["hexcode"]);
    expect(service["getColor"](dark_colors, 7)).toBe(dark_colors[7]["hexcode"]);
    expect(service["getColor"](dark_colors, 8)).toBe(dark_colors[8]["hexcode"]);
    expect(service["getColor"](dark_colors, 9)).toBe(dark_colors[9]["hexcode"]);
    expect(service["getColor"](dark_colors, 10)).toBe(dark_colors[10]["hexcode"]);
    expect(service["getColor"](dark_colors, 11)).toBe(dark_colors[11]["hexcode"]);

    // check for all the dracula colors
    expect(service["getColor"](dracula_colors, 0)).toBe(dracula_colors[0]["hexcode"]);
    expect(service["getColor"](dracula_colors, 1)).toBe(dracula_colors[1]["hexcode"]);
    expect(service["getColor"](dracula_colors, 2)).toBe(dracula_colors[2]["hexcode"]);
    expect(service["getColor"](dracula_colors, 3)).toBe(dracula_colors[3]["hexcode"]);
    expect(service["getColor"](dracula_colors, 4)).toBe(dracula_colors[4]["hexcode"]);
    expect(service["getColor"](dracula_colors, 5)).toBe(dracula_colors[5]["hexcode"]);
    expect(service["getColor"](dracula_colors, 6)).toBe(dracula_colors[6]["hexcode"]);
    expect(service["getColor"](dracula_colors, 7)).toBe(dracula_colors[7]["hexcode"]);
    expect(service["getColor"](dracula_colors, 8)).toBe(dracula_colors[8]["hexcode"]);
    expect(service["getColor"](dracula_colors, 9)).toBe(dracula_colors[9]["hexcode"]);
    expect(service["getColor"](dracula_colors, 10)).toBe(dracula_colors[10]["hexcode"]);
    expect(service["getColor"](dracula_colors, 11)).toBe(dracula_colors[11]["hexcode"]);

    // check for all the classic colors
    expect(service["getColor"](classic_colors, 0)).toBe(classic_colors[0]["hexcode"]);
    expect(service["getColor"](classic_colors, 1)).toBe(classic_colors[1]["hexcode"]);
    expect(service["getColor"](classic_colors, 2)).toBe(classic_colors[2]["hexcode"]);
    expect(service["getColor"](classic_colors, 3)).toBe(classic_colors[3]["hexcode"]);
    expect(service["getColor"](classic_colors, 4)).toBe(classic_colors[4]["hexcode"]);
    expect(service["getColor"](classic_colors, 5)).toBe(classic_colors[5]["hexcode"]);
    expect(service["getColor"](classic_colors, 6)).toBe(classic_colors[6]["hexcode"]);
    expect(service["getColor"](classic_colors, 7)).toBe(classic_colors[7]["hexcode"]);
    expect(service["getColor"](classic_colors, 8)).toBe(classic_colors[8]["hexcode"]);
    expect(service["getColor"](classic_colors, 9)).toBe(classic_colors[9]["hexcode"]);
    expect(service["getColor"](classic_colors, 10)).toBe(classic_colors[10]["hexcode"]);
    expect(service["getColor"](classic_colors, 11)).toBe(classic_colors[11]["hexcode"]);
  });
});
