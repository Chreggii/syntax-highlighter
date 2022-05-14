import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-presenter',
  templateUrl: './code-presenter.component.html',
  styleUrls: ['./code-presenter.component.scss'],
})
export class CodePresenterComponent {
  @Input() code?: string;
  //code = "TestCode"
}
