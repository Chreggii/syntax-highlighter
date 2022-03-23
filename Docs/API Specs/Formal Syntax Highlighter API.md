# RestAPI Design for the formal Syntax Highlighter

## GET `/lex-string`
### Description

Gets the annotated token sequence for the input text.

### Parameters

| Parameter | Required | Type                                  | default |
| --------- | -------- | ------------------------------------- | ------- |
| `text`    | ✅        | URL-encoded string                    | -       |
| `type`    | ✅        | string:`["python", "kotlin", "java"]` | -       |

### Responses

#### 200 OK
Array of LTok objects. An LTok object looks as follows: LTok{startIndex: int, stopIndex:int, tokenId: int}
#### 400 Bad request
Bad Request if parameters are missing or wrong/no type specified
## GET `/highlight-string`
### Description

Gets the annotated token sequence including the highlighting code for the input text.
### Parameters

The parameters are the same as the request for `GET /lex-string`.

### Response

#### 200 OK
Array of HTok objects. An LTok object looks as follows: LTok{hCodeValue: int, startIndex: int, stopIndex:int, tokenId: int}
#### 400 Bad request
Bad Request if parameters are missing or wrong/no type specified
