import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-formal-model',
  templateUrl: './page-formal-model.component.html',
  styleUrls: ['./page-formal-model.component.scss']
})
export class PageFormalModelComponent implements OnInit {
  showSourceCodeField = false;
  showUploadField = false
  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(): void {
    this.showSourceCodeField = false
    this.showUploadField = true;
  }

  pasteCode(): void {
    this.showUploadField = false;
    this.showSourceCodeField = true
  }

}
