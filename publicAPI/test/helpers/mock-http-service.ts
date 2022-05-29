import { Observable, of } from "rxjs";

import { MlFormattingResponse } from "../../src/models/ml-formatting-response.model";

export const mockHttpService = {
  post: (url: string) => getMockResponse(url),
  put: () => of(),
};

export const testFormatting = [
  { hexcode: "#000000", startIndex: 0, endIndex: 1 },
  { hexcode: "#7f0055", startIndex: 2, endIndex: 4 },
];

export const htmlResponse = `<span style="color:red">Test<span>`;

const getMockResponse = (url: string): Observable<{ data: any }> => {
  if (url === "http://formalSyntaxHighlighter:8080/highlight-string") {
    return of({ data: [] });
  } else if (url === "http://mlclassifier:3000/ml-highlight") {
    return of({
      data: {
        hCodeValues: [0, 1, 2, 3, 4, 5, 6],
        lexingData: [
          { startIndex: 0, endIndex: 1, tokenId: 1 },
          { startIndex: 1, endIndex: 2, tokenId: 3 },
        ],
      } as MlFormattingResponse,
    });
  } else if (url === "http://hCode_colorizer:3030/color-text?mode=classic") {
    return of({
      data: testFormatting,
    });
  } else if (
    url === "http://hCode_colorizer:3030/color-text-html?mode=classic"
  ) {
    return of({ data: htmlResponse });
  }
};
