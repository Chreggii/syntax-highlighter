export interface MlFormattingResponse {
  hCodeValues: number[];
  lexingData: { startIndex: number, endIndex: number, tokenId: number }[]
}
