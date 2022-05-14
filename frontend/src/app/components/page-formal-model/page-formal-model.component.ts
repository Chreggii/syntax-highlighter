import { Component } from '@angular/core';

@Component({
  selector: 'app-page-formal-model',
  templateUrl: './page-formal-model.component.html',
  styleUrls: ['./page-formal-model.component.scss']
})
export class PageFormalModelComponent {
  showSourceCodeField = false;
  showUploadField = false
  showHCodes = false;
  showResults = false;

  useFile(): void {
    this.showSourceCodeField = false;
    this.showUploadField = true;
  }

  useCode(): void {
    this.showUploadField = false;
    this.showSourceCodeField = true;
  }


}
