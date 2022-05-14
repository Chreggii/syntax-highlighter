import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-formal-model',
  templateUrl: './page-formal-model.component.html',
  styleUrls: ['./page-formal-model.component.scss']
})
export class PageFormalModelComponent implements OnInit {
  showUploadBox = false;
  showSourceCodeField = false;
  showUploadField = false
  showHCodes = false;
  showResults = false;
  constructor() { }

  ngOnInit(): void {
  }

  uploadCode(): void {
    this.showUploadBox = true;
  }

  useFile(): void {
    this.showSourceCodeField = false;
    this.showUploadField = true;
  }

  useCode(): void {
    this.showUploadField = false;
    this.showSourceCodeField = true;
  }

  useHCode(): void {
    this.showHCodes = true;
  }

  results(): void {
    this.showResults = true;
  }

}
