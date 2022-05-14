import { Component, OnInit } from '@angular/core';
import {getBaseUrl} from "../../functions/url-resolver.function";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {HighlightService} from "../../services/highlighter/highlight.service";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-code-uploader',
  templateUrl: './code-uploader.component.html',
  styleUrls: ['./code-uploader.component.scss']
})
export class CodeUploaderComponent implements OnInit {

  readonly form = this.formBuilder.group({
    sourceText: undefined,
    language: undefined,
  });
  code?: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private highlightService: HighlightService) { }

  ngOnInit(): void {
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
}
