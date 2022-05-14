import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-ml-model',
  templateUrl: './page-ml-model.component.html',
  styleUrls: ['./page-ml-model.component.scss']
})
export class PageMlModelComponent implements OnInit {
  showSourceCodeField = false;
  showUploadField = false
  showHCodes = false;
  showResults = false;
  constructor() { }

  ngOnInit(): void {
  }

  useFile(): void {
    this.showSourceCodeField = false;
    this.showUploadField = true;
  }

  useCode(): void {
    this.showUploadField = false;
    this.showSourceCodeField = true;
  }

}
