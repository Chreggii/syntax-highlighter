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

**Example response**:

```json
[
  {
    "startIndex": 0,
    "endIndex": 4,
    "tokenId": 42
  },
  {
    "startIndex": 5,
    "endIndex": 5,
    "tokenId": 54
  },
  {
    "startIndex": 6,
    "endIndex": 19,
    "tokenId": 3
  },
  {
    "startIndex": 20,
    "endIndex": 20,
    "tokenId": 55
  }
]
```

#### 400 Bad request
Bad Request if parameters are missing or wrong/no type specified

**Example response:**

```json
{
  "error": {
    "code": 400,
    "type": "Bad Request",
    "reasons": "The given reason that triggered the bad request."
  }
}
```



## GET `/highlight-string`
### Description

Gets the annotated token sequence including the highlighting code for the input text.
### Parameters

The parameters are the same as the request for `GET /lex-string`.

### Response

#### 200 OK
Array of HTok objects. An LTok object looks as follows: LTok{hCodeValue: int, startIndex: int, stopIndex:int, tokenId: int}

**Exampke response**:

```json
[
  {
    "hCodeValue": 9,
    "startIndex": 0,
    "endIndex": 4,
    "tokenId": 42
  },
  {
    "hCodeValue": 0,
    "startIndex": 5,
    "endIndex": 5,
    "tokenId": 54
  },
  {
    "hCodeValue": 3,
    "startIndex": 6,
    "endIndex": 19,
    "tokenId": 3
  },
  {
    "hCodeValue": 0,
    "startIndex": 20,
    "endIndex": 20,
    "tokenId": 55
  },
  {
    "hCodeValue": 0,
    "startIndex": 21,
    "endIndex": 20,
    "tokenId": -1
  }
]
```



#### 400 Bad request
Bad Request if parameters are missing or wrong/no type specified

**Example response**:

```json
{
  "error": {
    "code": 400,
    "type": "Bad Request",
    "reasons": "The given reason that triggered the bad request."
  }
}
```

