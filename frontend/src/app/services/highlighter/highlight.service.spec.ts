/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HighlightService } from './highlight.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Service: Highlight', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        HighlightService,
        FormBuilder,
        HttpClient,
        HttpHandler,
        HttpTestingController,
      ],
    }).compileComponents();
  });

  it('should create', inject(
    [HighlightService],
    (service: HighlightService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should return the correctly highlighted text for the formal syntax highlighter', inject(
    [HighlightService],
    (service: HighlightService) => {
      const sourceCode = "print('hello');";
      const lexArray = [
        { hexcode: '#ffcd01', startIndex: 0, endIndex: 4 },
        { hexcode: '#000000', startIndex: 5, endIndex: 5 },
        { hexcode: '#006400', startIndex: 6, endIndex: 12 },
        { hexcode: '#000000', startIndex: 13, endIndex: 13 },
        { hexcode: '#000000', startIndex: 14, endIndex: 14 },
        { hexcode: '#000000', startIndex: 15, endIndex: 14 },
      ];
      service.highlightTextFormal(sourceCode, lexArray);
      console.log(service.getHighlightTextFormal());
      expect(service.getHighlightTextFormal()).toEqual(
        '<span style="color: #ffcd01;">print</span><span style="color: #000000;">(</span><span style="color: #006400;">\'hello\'</span><span style="color: #000000;">)</span><span style="color: #000000;">;</span><span style="color: #000000;"></span>'
      );
    }
  ));

  it('should return the correctly highlighted text for the ml highlighter', inject(
    [HighlightService],
    (service: HighlightService) => {
      const sourceCode = "print('hello');";
      const lexArray = [
        { hexcode: '#ffcd01', startIndex: 0, endIndex: 4 },
        { hexcode: '#000000', startIndex: 5, endIndex: 5 },
        { hexcode: '#006400', startIndex: 6, endIndex: 12 },
        { hexcode: '#000000', startIndex: 13, endIndex: 13 },
        { hexcode: '#000000', startIndex: 14, endIndex: 14 },
        { hexcode: '#000000', startIndex: 15, endIndex: 14 },
      ];
      service.highlightTextML(sourceCode, lexArray);
      expect(service.getHighlightTextML()).toEqual(
        '<span style="color: #ffcd01;">print</span><span style="color: #000000;">(</span><span style="color: #006400;">\'hello\'</span><span style="color: #000000;">)</span><span style="color: #000000;">;</span><span style="color: #000000;"></span>'
      );
    }
  ));

  it('should correctly store the html text formal', inject(
    [HighlightService],
    (service: HighlightService) => {
      const sourceCode =
        '<span style="color: #ffcd01;">print</span><span style="color: #000000;">(</span><span style="color: #006400;">\'hello\'</span><span style="color: #000000;">)</span><span style="color: #000000;">;</span><span style="color: #000000;"></span>';
      service.highlightHtmlFormal(sourceCode);
      expect(service.getHighlightTextFormal()).toEqual(
        '<span style="color: #ffcd01;">print</span><span style="color: #000000;">(</span><span style="color: #006400;">\'hello\'</span><span style="color: #000000;">)</span><span style="color: #000000;">;</span><span style="color: #000000;"></span>'
      );
    }
  ));

  it('should correctly store the html text ml', inject(
    [HighlightService],
    (service: HighlightService) => {
      const sourceCode =
        '<span style="color: #ffcd01;">print</span><span style="color: #000000;">(</span><span style="color: #006400;">\'hello\'</span><span style="color: #000000;">)</span><span style="color: #000000;">;</span><span style="color: #000000;"></span>';
      service.highlightHtmlML(sourceCode);
      expect(service.getHighlightTextML()).toEqual(
        '<span style="color: #ffcd01;">print</span><span style="color: #000000;">(</span><span style="color: #006400;">\'hello\'</span><span style="color: #000000;">)</span><span style="color: #000000;">;</span><span style="color: #000000;"></span>'
      );
    }
  ));
});
