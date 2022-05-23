import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlightedText?: string;

  highlightText(sourceCode: string, lexingArray: { hexcode: string, startIndex: number, endIndex: number }[]): void {
    this.highlightedText = this.replaceText(sourceCode, lexingArray);
  }

  setHighlightText(code: string) {
    this.highlightedText = code;
  }

  getHighlightText(): string | undefined {
    return this.highlightedText;
  }

  private replaceText(sourceCode: string, lexingArray: { hexcode: string, startIndex: number, endIndex: number }[]): string {
    let highlightedText = '';
    let cursor = 0;
    lexingArray.forEach(item => {
      if (cursor <= item.startIndex) {
        if (item.startIndex !== cursor) {
          highlightedText = highlightedText + sourceCode.substring(cursor, item.startIndex)
        }
        highlightedText = highlightedText + this.getColoredElement(sourceCode.substring(item.startIndex, item.endIndex + 1), item.hexcode);
        cursor = item.endIndex + 1;
      }
    })
    return highlightedText;
  }

  private getColoredElement(key: string, color: string): string {
    return `<span style="color: ${color};">${key}</span>`;
  }
}
