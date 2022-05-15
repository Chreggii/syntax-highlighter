import { Component, Input } from '@angular/core';
import {HighlightService} from "../../services/highlighter/highlight.service";

@Component({
  selector: 'app-code-presenter',
  templateUrl: './code-presenter.component.html',
  styleUrls: ['./code-presenter.component.scss'],
})
export class CodePresenterComponent {

  constructor(public highlightService: HighlightService) {
  }

}
