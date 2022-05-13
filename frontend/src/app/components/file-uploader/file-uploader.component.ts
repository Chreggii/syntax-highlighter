import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {HighlightService} from "../../services/highlighter/highlight.service";
import {getBaseUrl} from "../../functions/url-resolver.function";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  code?: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private highlightService: HighlightService) { }


  ngOnInit(): void {
  }

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

}
