import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlightedTextFormal?: string;
  private highlightedTextML?: string;

  highlightTextFormal(
    sourceCode: string,
    lexingArray: { hexcode: string; startIndex: number; endIndex: number }[]
  ): void {
    this.highlightedTextFormal = this.replaceText(sourceCode, lexingArray);
  }

  highlightTextML(
    sourceCode: string,
    lexingArray: { hexcode: string; startIndex: number; endIndex: number }[]
  ): void {
    this.highlightedTextML = this.replaceText(sourceCode, lexingArray);
  }

  getHighlightTextFormal(): string | undefined {
    return this.highlightedTextFormal;
  }

  getHighlightTextML(): string | undefined {
    return this.highlightedTextML;
  }

  private replaceText(
    sourceCode: string,
    lexingArray: { hexcode: string; startIndex: number; endIndex: number }[]
  ): string {
    let highlightedText = '';
    let cursor = 0;
    lexingArray.forEach((item) => {
      if (cursor <= item.startIndex) {
        if (item.startIndex !== cursor) {
          highlightedText =
            highlightedText + sourceCode.substring(cursor, item.startIndex);
        }
        highlightedText =
          highlightedText +
          this.getColoredElement(
            sourceCode.substring(item.startIndex, item.endIndex + 1),
            item.hexcode
          );
        cursor = item.endIndex + 1;
      }
    });
    return highlightedText;
  }

  private getColoredElement(key: string, color: string): string {
    return `<span style="color: ${color};">${key}</span>`;
  }
}
