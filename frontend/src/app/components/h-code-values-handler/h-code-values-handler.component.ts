import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { getBaseUrl } from '../../functions/url-resolver.function';

@Component({
  selector: 'app-h-code-values-handler',
  templateUrl: './h-code-values-handler.component.html',
  styleUrls: ['./h-code-values-handler.component.scss'],
})
export class HCodeValuesHandlerComponent {
  readonly form = this.formBuilder.group({
    hCodeNumber: undefined,
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

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
