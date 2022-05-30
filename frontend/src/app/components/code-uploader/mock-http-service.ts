import { Observable, of } from 'rxjs';

import { getBaseUrl } from '../../functions/url-resolver.function';

export const mockHttpService = {
  post: (url: string) => getMockResponse(url),
  put: () => of(),
};

export const testFormatting = [
  { hexcode: '#000000', startIndex: 0, endIndex: 1 },
  { hexcode: '#7f0055', startIndex: 2, endIndex: 4 },
];

export const htmlResponse = `<span style="color:red">Test<span>`;

const getMockResponse = (url: string): Observable<{ data: any }> => {
  if (url === `${getBaseUrl()}/highlight-text`) {
    return of({ data: [] });
  } else if (url === `${getBaseUrl()}/highlight-text-html`) {
    return of({
      data: {
        hCodeValues: [0, 1, 2, 3, 4, 5, 6],
        lexingData: [
          { startIndex: 0, endIndex: 1, tokenId: 1 },
          { startIndex: 1, endIndex: 2, tokenId: 3 },
        ],
      },
    });
  } else if (url === `${getBaseUrl()}/highlight-file`) {
    return of({
      data: testFormatting,
    });
  } else if (url === `${getBaseUrl()}/highlight-file-html`) {
    return of({ data: htmlResponse });
  }
  return new Observable<{ data: null }>();
};
