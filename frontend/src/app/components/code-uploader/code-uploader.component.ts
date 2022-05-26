import { HttpClient } from '@angular/common/http';
import {Component, Input} from '@angular/core';
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

  @Input()
  public useMLFormatter: boolean = false

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
          if (!this.useMLFormatter) {
            this.highlightService.highlightTextFormal(response.sourceCode, response.formalFormatting);
          }
          if (this.useMLFormatter) {
            this.highlightService.highlightTextML(response.sourceCode, response.mlFormatting);
          }
        });
    }
  }

  sendRequest(): void {
    const data = {
      sourceText: this.form.get('sourceText')?.value,
      language: this.form.get('language')?.value,
    };
    this.http
      .post<any>(`${getBaseUrl()}/highlight-text`, data)
      .subscribe((response) => {
        console.log(response);
        if (!this.useMLFormatter) {
          this.highlightService.highlightTextFormal(response.sourceCode, response.formalFormatting);
        }
        if (this.useMLFormatter) {
          this.highlightService.highlightTextML(response.sourceCode, response.mlFormatting);
        }
      });
  }
}
