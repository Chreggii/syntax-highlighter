import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { getBaseUrl } from '../../functions/url-resolver.function';
import { HighlightService } from '../../services/highlighter/highlight.service';

@Component({
  selector: 'app-code-uploader',
  templateUrl: './code-uploader.component.html',
  styleUrls: ['./code-uploader.component.scss'],
})
export class CodeUploaderComponent {
  readonly form = this.formBuilder.group({
    sourceText: undefined,
    language: undefined,
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private highlightService: HighlightService
  ) { }

  onFileSelected(event: any): void {
    const file: File = event.target?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post<any>(`${getBaseUrl()}/highlight-file`, formData)
        .subscribe((response) => {
          console.log(response);
          this.highlightService.highlightText(
            response.sourceCode,
            // TODO Nicolas: Decide which model we should use
            response.formalFormatting
          );
        });
    }
  }

  sendRequest(formattingType: string): void {
    const data = {
      sourceText: this.form.get('sourceText')?.value,
      language: this.form.get('language')?.value,
    };
    this.http
      .post<any>(`${getBaseUrl()}/highlight-text`, data)
      .subscribe((response) => {
        console.log(response);
        if (formattingType === 'formalFormatting') {
          this.highlightService.highlightText(response.sourceCode, response.formalFormatting);
        }
        if (formattingType === 'mlFormatting') {
          this.highlightService.highlightText(response.sourceCode, response.mlFormatting);
        }
        if (formattingType !== 'formalFormatting' && formattingType !== 'mlFormatting'){
          throw {
            name: 'Invalid Formatting Type',
            message: 'Please enter a valid formatting type. Valid types are mlFormatting and formalFormatting',
            toString: function() {
              return this.name + ': ' + this.message
            }
          }
        }
        /*
        this.highlightService.highlightText(
          response.sourceCode,
          // TODO Nicolas: Decide which model we should use
          response.formalFormatting
        );*/
      });
  }
}
