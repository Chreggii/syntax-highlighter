import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  // TODO Alain: implement here the coloring

  highlightText(sourceCode: string): string {
    return sourceCode.replace(
      'import',
      this.getColoredElement('import', 'red')
    );
  }

  private getColoredElement(key: string, color: string): string {
    return `<span style="color: ${color};">${key}</span>`;
  }
}
