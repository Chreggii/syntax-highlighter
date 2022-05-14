import { Component } from '@angular/core';

@Component({
  selector: 'app-page-ml-model',
  templateUrl: './page-ml-model.component.html',
  styleUrls: ['./page-ml-model.component.scss'],
})
export class PageMlModelComponent {
  showSourceCodeField = false;
  showUploadField = false;
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
