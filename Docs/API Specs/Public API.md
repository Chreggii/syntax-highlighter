# Public API specification

* Requests are done without authentication.

## Endpoints

### `POST /highlight-text`

#### Parameters

| Parameter    | Required | Type                                  | default | Description                                                                                                                                                                                                                                             |
| ------------ | -------- | ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceText` | ✅        | string                                | -       | The source code that is to be highlighted. This source-code must be URL-encoded.                                                                                                                                                                        |
| `language`   | ✅        | string:`["python", "kotlin", "java"]` | -       | The programming language that the code is written in. If no programming language is defined, an educated guess will be made and redirected to the endpoint with the guess. It is strongly recommended you set the language instead of letting it guess. |

#### Responses

##### 200 OK

Returns the highlighted code

**Example response:**

```json
{
  "sourceCode": "print('Hello, world!')",
  "formalFormatting": [
    {"startIndex": 0, "endIndex": 4, "hexcode": "#1f7199"}, 
    {"startIndex": 5, "endIndex": 5, "hexcode": "#ffcd01"}, 
    {"startIndex": 6, "endIndex": 20, "hexcode": "#ffcd01"},
    {"startIndex": 21, "endIndex": 21, "hexcode": "#880000"}
  ],
  "mlFormatting": [
    {"startIndex": 0, "endIndex": 4, "hexcode": "#1f7199"}, 
    {"startIndex": 5, "endIndex": 5, "hexcode": "#ffcd01"}, 
    {"startIndex": 6, "endIndex": 20, "hexcode": "#ffcd01"},
    {"startIndex": 21, "endIndex": 21, "hexcode": "#880000"}
  ]
}
```

##### 400 Bad Request

Requests might be missing a required parameter or is badly encoded.

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

##### 414 URI Too Long

Sometimes the source-text was too large, and therefore we can't give you a proper reply.

**Example response:**

```json
{
  "error": {
    "code": 414,
    "type": "URI Too Long",
    "reasons": "URI is too long, max allowed is xxx, request is xxx long."
  }
}
```

### `POST /highlight-file`

>  **Note**: This technically probably breaks the REST principles, but I would keep it that way for usability.

#### Parameters

The post enpoint only accepts a file that is uploaded.

#### Responses

##### 302 Found

Given a valid file and language, you will be redirected to the proper `GET /highlight-text` endpoint.

**Example response (Headers):**

```bash
HTTP/1.1 302 Found
Location: /highlight-text?language=<language>&source-text=<source-text>
```

##### 400 Bad Request

Requests might be missing a required parameter or is badly encoded.

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

##### 413 Payload Too Large

Sometimes the source-text was too large, and therefore we can't give you a proper reply.

**Example response:**

```json
{
  "error": {
    "code": 413,
    "type": "Payload Too Large",
    "reasons": "Your provided file is too large, max allowed is xxx, request is xxx long."
  }
}
```

### GET `/h-code-values`

Endpoint for all the hCodeValues for the different.

#### Responses

##### 200 OK

```json
[
  {"name": "ANY", "hCodeValue": 0}, 
  {"name": "KEYWORD", "hCodeValue": 1}, 
  {"name": "LITERAL", "hCodeValue": 2}, 
  {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3},
  {"name": "COMMENT", "hCodeValue": 4},
  {"name": "CLASS_DECLARATOR", "hCodeValue": 5},
  {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6},
  {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7},
  {"name": "TYPE_IDENTIFIER", "hCodeValue": 8},
  {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9},
  {"name": "FIELD_IDENTIFIER", "hCodeValue": 10},
  {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11}
]
```

### GET `/h-code-value/<value>`

Endpoint for a specific hCodeValue including a suggested color.

#### Parameters

| Parameter | Required | Type                                    | default | Description                            |
| --------- | -------- | --------------------------------------- | ------- | -------------------------------------- |
| `mode`    | ✅        | string:`["dark", "dracula", "classic"]` | -       | Mode for returning colors accordingly. |



#### Responses

##### 200 OK 

**Example: `GET /h-code-value/3?mode=dark`**

```json
{
  "name": "CHAR_STRING_LITERAL",
  "hCodeValue": "3",
  "color": "#006400"
}
```

##### 404 Not Found

**Example: `GET /h-code-value/21?mode=dark`**
```json
{
  "error": "HCode for 21 does not exist."
}


```

##### 400 Bad Request
**Example: `GET /h-code-value/3?mode=bright`**
```json
{
"error": "Mode bright does not exist. Please choose between dark, dracula or classic."
}
```

**Example: `GET /h-code-value/3`**
```json
{
  "error": "A parameter 'mode' should be defined. Please choose between dark, dracula or classic."
}
```

