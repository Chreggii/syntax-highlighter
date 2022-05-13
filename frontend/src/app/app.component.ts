import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { getBaseUrl } from './functions/url-resolver.function';
import { HighlightService } from './services/highlighter/highlight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly form = this.formBuilder.group({
    sourceText: undefined,
    language: undefined,
    hCodeNumber: undefined,
  });
  code?: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private highlightService: HighlightService) { }

  onFileSelected(event: any): void {
    const file: File = event.target?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post<any>(`${getBaseUrl()}/highlight-file`, formData)
        .subscribe((response) => {
          console.log(response)
          this.code = this.highlightService.highlightText(response['source-code']);
        });
    }
  }

  sendRequest(): void {
    const data = {
      sourceText: this.form.get('sourceText')?.value,
      language: this.form.get('language')?.value,
    };
    this.http
      .post<any>(
        `${getBaseUrl()}/highlight-text`,
        data
      )
      .subscribe(response => {
        console.log(response);
        this.code = this.highlightService.highlightText(response['source-code']);
      });
  }

  logHCodes(): void {
    this.http.get(`${getBaseUrl()}/h-code-value`).subscribe(console.log);
  }

  logHCode(): void {
    const value = this.form.get('hCodeNumber')?.value;
    this.http
      .get(`${getBaseUrl()}/h-code-value/${value}`)
      .subscribe(console.log);
  }
}
