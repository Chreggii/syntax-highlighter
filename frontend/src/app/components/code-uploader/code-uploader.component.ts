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
    mode: undefined,
    returnHtml: undefined
  });

  readonly formFile = this.formBuilder.group({
    mode: undefined,
    returnHtml: undefined

  });

  @Input()
  public useMLFormatter = false;
  private fileFormData = new FormData();
  private fileUseHtml = false;
  private textUseHtml = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private highlightService: HighlightService,
  ) {}

  getFormData(): FormData {
    return this.fileFormData
  }

  uploadFile(event: any): FormData {
    const file: File = event.target?.files?.[0];
    this.fileFormData = new FormData();
    if (file) {
      this.fileFormData.set('file', file);
    }
    return this.fileFormData;
  }

  getFileUrlString(): string {
    if (this.formFile.get('returnHtml')?.value === 'yes') {
      this.fileUseHtml = true;
      return '-html';
    }
    else {
      this.fileUseHtml = false;
      return '';
    }
  }

  getTextUrlString(): string {
    if (this.formText.get('returnHtml')?.value === 'yes') {
      this.textUseHtml = true;
      return '-html';
    }
    else {
      this.textUseHtml = false;
      return '';
    }
  }

  sendFileRequest(formData: FormData, mode: string): void {
    formData.set('mode', mode)
    const htmlExtension = this.getFileUrlString();

    if(formData.has('file') && formData.has('mode')) {
      this.http
        .post<any>(`${getBaseUrl()}/highlight-file` + htmlExtension, this.fileFormData)
        .subscribe((response) => {
          console.log(response);
          if (!this.useMLFormatter) {
            if(this.fileUseHtml){
              this.highlightService.highlightHtmlFormal(response.formalFormatting)
            } else {
              this.highlightService.highlightTextFormal(
                response.sourceCode,
                response.formalFormatting,
              );
            }
          }
          if (this.useMLFormatter) {
            if(this.fileUseHtml){
              this.highlightService.highlightHtmlML(response.mlFormatting)
            } else {
              this.highlightService.highlightTextML(
                response.sourceCode,
                response.mlFormatting,
              );
            }
          }
        });
    }
  }

  sendTextRequest(): void {
    const data = {
      sourceText: this.formText.get('sourceText')?.value,
      language: this.formText.get('language')?.value,
      mode: this.formText.get('mode')?.value
    };
    const htmlExtension = this.getTextUrlString();

    this.http
      .post<any>(`${getBaseUrl()}/highlight-text` + htmlExtension, data)
      .subscribe((response) => {
        console.log(response);

        if (!this.useMLFormatter) {
          if(this.textUseHtml){
              this.highlightService.highlightHtmlFormal(response.formalFormatting)
          } else {
            this.highlightService.highlightTextFormal(
              response.sourceCode,
              response.formalFormatting,
            );
          }
        }
        if (this.useMLFormatter) {
          if(this.textUseHtml){
            this.highlightService.highlightHtmlML(response.mlFormatting)
          } else {
            this.highlightService.highlightTextML(
              response.sourceCode,
              response.mlFormatting,
            );
          }
        }
      });
  }
}
