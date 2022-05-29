import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlightedTextFormal?: string;
  private highlightedTextML?: string;

  /**
   * Highlights the provided source code according to the lexing array, assigning it to the formal result.
   * @param sourceCode The source code that shall be colorized.
   * @param lexingArray The lexing array that will be used to colorize.
   */
  highlightTextFormal(
    sourceCode: string,
    lexingArray: { hexcode: string; startIndex: number; endIndex: number }[]
  ): void {
    this.highlightedTextFormal = this.replaceText(sourceCode, lexingArray);
  }

  /**
   * Highlights the provided source code according to the lexing array, assigning it to the ml result.
   * @param sourceCode The source code that shall be colorized.
   * @param lexingArray The lexing array that will be used to colorize.
   */
  highlightTextML(
    sourceCode: string,
    lexingArray: { hexcode: string; startIndex: number; endIndex: number }[]
  ): void {
    this.highlightedTextML = this.replaceText(sourceCode, lexingArray);
  }

  /**
   * Assigns the html string to the formal highlighted text.
   * @param htmlString The html string.
   */
  highlightHtmlFormal(htmlString: string) {
    this.highlightedTextFormal = htmlString;
  }

  /**
   * Assigns the html string to the ml highlighted text.
   * @param htmlString The html string.
   */
  highlightHtmlML(htmlString: string) {
    this.highlightedTextML = htmlString;
  }

  /**
   * Returns the formal highlighted text.
   */
  getHighlightTextFormal(): string | undefined {
    return this.highlightedTextFormal;
  }

  /**
   * Returns the ml highlighted text.
   */
  getHighlightTextML(): string | undefined {
    return this.highlightedTextML;
  }

  /**
   * Applies the lexing data to the provided source code and replaces the current text.
   * @param sourceCode The source code.
   * @param lexingArray The lexing array used to colorize.
   * @private
   */
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

  /**
   * Gets the colored element
   * @param key The key.
   * @param color The color.
   * @private
   */
  private getColoredElement(key: string, color: string): string {
    return `<span style="color: ${color};">${key}</span>`;
  }
}
