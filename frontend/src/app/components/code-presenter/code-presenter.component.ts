import { Component, Input } from '@angular/core';
import { HighlightService } from '../../services/highlighter/highlight.service';

@Component({
  selector: 'app-code-presenter',
  templateUrl: './code-presenter.component.html',
  styleUrls: ['./code-presenter.component.scss'],
})
export class CodePresenterComponent {
  @Input()
  public useMLFormatter = false;
  public darkModeActivated = false;

  constructor(public highlightService: HighlightService) {}
}
