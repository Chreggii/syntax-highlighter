export interface HighlightedTextResponse {
  formalFormatting: HighlightedText[];
  mlFormatting: HighlightedText[];
  sourceCode: string;
}

interface HighlightedText {
  startIndex: number;
  endIndex: number;
  hexcode: string;
}
