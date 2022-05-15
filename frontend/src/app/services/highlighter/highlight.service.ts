import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  // TODO Alain: implement here the coloring

  private highlightedText?: string;

  setHighlightText(sourceCode: string): void {
    this.highlightedText = sourceCode.replace(
      'import',
      this.getColoredElement('import', 'red')
    );
  }

  getHighlightText(): string | undefined {
    return this.highlightedText;
  }

  private getColoredElement(key: string, color: string): string {
    return `<span style="color: ${color};">${key}</span>`;
  }
}
