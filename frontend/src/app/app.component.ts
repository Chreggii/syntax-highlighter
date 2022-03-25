import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { getURL } from './functions/url-resolver.function';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly form = this.formBuilder.group({ sourceText: undefined, language: undefined });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  onFileSelected(event: any): void {
    const file: File = event.target?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post<string>(getURL(), formData).pipe().subscribe(response => console.log((response)));
    }
  }

  sendRequest(): void {
    const data = { sourceText: this.form.get('sourceText')?.value, language: this.form.get('language')?.value }
    this.http.get(`${getURL()}?sourceText=${data.sourceText}&language=${data.language}`).subscribe(console.log)
  }
}
