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
    returnHtml: undefined,
  });

  readonly formFile = this.formBuilder.group({
    mode: undefined,
    returnHtml: undefined,
  });

  @Input()
  public useMLFormatter = false;
  private fileFormData = new FormData();
  private fileUseHtml = false;
  private textUseHtml = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private highlightService: HighlightService
  ) {}

  /**
   * Gets the form data corresponding to the File.
   */
  getFileFormData(): FormData {
    return this.fileFormData;
  }

  /**
   * Prepares the file for sending it to the backend.
   * @param event Watches the input event.
   */
  uploadFile(event: any): FormData {
    const file: File = event.target?.files?.[0];
    this.fileFormData = new FormData();
    if (file) {
      this.fileFormData.set('file', file);
    }
    return this.fileFormData;
  }

  /**
   * Gets the Url for a file request, depending on whether html or normal text shall be requested.
   */
  getFileUrlString(): string {
    if (this.formFile.get('returnHtml')?.value === 'yes') {
      this.fileUseHtml = true;
      return '-html';
    } else {
      this.fileUseHtml = false;
      return '';
    }
  }

  /**
   * Gets the Url for a text request, depending on whether html or normal text shall be requested.
   */
  getTextUrlString(): string {
    if (this.formText.get('returnHtml')?.value === 'yes') {
      this.textUseHtml = true;
      return '-html';
    } else {
      this.textUseHtml = false;
      return '';
    }
  }

  /**
   * Sends the file to the backend to get it colorized. The colorized return will be handled in the Highlight.Service.
   * @param formData The form data of the File.
   * @param mode The colorizing mode.
   */
  sendFileRequest(formData: FormData, mode: string): void {
    this.formFile.markAllAsTouched();
    if (!this.formFile.valid) {
      return;
    }

    formData.set('mode', mode);
    const htmlExtension = this.getFileUrlString();

    if (formData.has('file') && formData.has('mode')) {
      this.http
        .post<any>(
          `${getBaseUrl()}/highlight-file` + htmlExtension,
          this.fileFormData
        )
        .subscribe((response) => {
          console.log(response);
          if (!this.useMLFormatter) {
            if (this.fileUseHtml) {
              this.highlightService.highlightHtmlFormal(
                response.formalFormatting
              );
            } else {
              this.highlightService.highlightTextFormal(
                response.sourceCode,
                response.formalFormatting
              );
            }
          }
          if (this.useMLFormatter) {
            if (this.fileUseHtml) {
              this.highlightService.highlightHtmlML(response.mlFormatting);
            } else {
              this.highlightService.highlightTextML(
                response.sourceCode,
                response.mlFormatting
              );
            }
          }
        });
    }
  }

  /**
   * Sends the text to the backend to get it colorized. The colorized return will be handled in the Highlight.Service.
   */
  sendTextRequest(): void {
    this.formText.markAllAsTouched();
    if (!this.formText.valid) {
      return;
    }

    const data = {
      sourceText: this.formText.get('sourceText')?.value,
      language: this.formText.get('language')?.value,
      mode: this.formText.get('mode')?.value,
    };
    const htmlExtension = this.getTextUrlString();

    this.http
      .post<any>(`${getBaseUrl()}/highlight-text` + htmlExtension, data)
      .subscribe((response) => {
        console.log(response);

        if (!this.useMLFormatter) {
          if (this.textUseHtml) {
            this.highlightService.highlightHtmlFormal(
              response.formalFormatting
            );
          } else {
            this.highlightService.highlightTextFormal(
              response.sourceCode,
              response.formalFormatting
            );
          }
        }
        if (this.useMLFormatter) {
          if (this.textUseHtml) {
            this.highlightService.highlightHtmlML(response.mlFormatting);
          } else {
            this.highlightService.highlightTextML(
              response.sourceCode,
              response.mlFormatting
            );
          }
        }
      });
  }
}
