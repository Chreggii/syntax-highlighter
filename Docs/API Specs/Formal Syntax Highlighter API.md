# RestAPI Design for the formal Syntax Highlighter

## GET `/lex-string`
### Description

Gets the annotated token sequence for the input text.

### Parameters

text: string
type: string (type can be either Java, Python or Kotlin
(Optional Feature: Auto))

### Responses

#### 200 OK
Array of LTok objects. An LTok object looks as follows: LTok{startIndex: int, stopIndex:int, tokenId: int}
#### 400 Bad request
Bad Request if parameters are missing or wrong/no type specified
## GET `/highlight-string`
### Description

Gets the annotated token sequence including the highlighting code for the input text.
### Parameters

text: string
type: string (type can be either Java, Python or Kotlin
(Optional Feature: Auto))

### Response

#### 200 OK
Array of HTok objects. An LTok object looks as follows: LTok{hCodeValue: int, startIndex: int, stopIndex:int, tokenId: int}
#### 400 Bad request
Bad Request if parameters are missing or wrong/no type specified
