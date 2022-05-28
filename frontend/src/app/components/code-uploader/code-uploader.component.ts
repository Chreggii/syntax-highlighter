import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { getBaseUrl } from '../../functions/url-resolver.function';
import { HighlightService } from '../../services/highlighter/highlight.service';

@Component({
  selector: 'app-code-uploader',
  templateUrl: './code-uploader.component.html',
  styleUrls: ['./code-uploader.component.scss'],
})
export class CodeUploaderComponent {
  readonly formText = this.formBuilder.group({
    sourceText: undefined,
    language: undefined,
    mode: undefined
  });

  readonly formFile = this.formBuilder.group({
    mode: undefined
  });

  @Input()
  public useMLFormatter = false;
  private fileFormData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private highlightService: HighlightService,
  ) {}

  uploadFile(event: any): void {
    const file: File = event.target?.files?.[0];
    if (file) {
      this.fileFormData = new FormData();
      this.fileFormData.append('file', file);
    }
  }

  sendFileRequest(): void {
    this.fileFormData.set('mode', this.formFile.get('mode')?.value)

    this.http
      .post<any>(`${getBaseUrl()}/highlight-file`, this.fileFormData)
      .subscribe((response) => {
        console.log(response);
        if (!this.useMLFormatter) {
          this.highlightService.highlightTextFormal(
            response.sourceCode,
            response.formalFormatting
          );
        }
        if (this.useMLFormatter) {
          this.highlightService.highlightTextML(
            response.sourceCode,
            response.mlFormatting
          );
        }
      });
  }

  sendTextRequest(): void {
    const data = {
      sourceText: this.formText.get('sourceText')?.value,
      language: this.formText.get('language')?.value,
      mode: this.formText.get('mode')?.value
    };
    this.http
      .post<any>(`${getBaseUrl()}/highlight-text`, data)
      .subscribe((response) => {
        console.log(response);
        if (!this.useMLFormatter) {
          this.highlightService.highlightTextFormal(
            response.sourceCode,
            response.formalFormatting
          );
        }
        if (this.useMLFormatter) {
          this.highlightService.highlightTextML(
            response.sourceCode,
            response.mlFormatting
          );
        }
      });
  }
}
