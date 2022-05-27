# Public API specification

* Requests are done without authentication.

## Endpoints

### `POST /highlight-text`

#### Parameters

| Parameter    | Required | Type                                    | default   | Description                                                                                                                                                                                                                                             |
| ------------ | -------- | --------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceText` | ✅        | string                                  | -         | The source code that is to be highlighted. This source-code must be URL-encoded.                                                                                                                                                                        |
| `language`   | ✅        | string:`["python", "kotlin", "java"]`   | -         | The programming language that the code is written in. If no programming language is defined, an educated guess will be made and redirected to the endpoint with the guess. It is strongly recommended you set the language instead of letting it guess. |
| `mode`       |          | string:`['dark', 'dracula', 'classic']` | `classic` | The mode in which the highlighted colors should be displayed. This parameter is optional and by default `classic` will be chosen.                                                                                                                       |

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

### `POST /highlight-text-html`

#### Parameters

| Parameter    | Required | Type                                    | default   | Description                                                                                                                                                                                                                                             |
| ------------ | -------- | --------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceText` | ✅        | string                                  | -         | The source code that is to be highlighted. This source-code must be URL-encoded.                                                                                                                                                                        |
| `language`   | ✅        | string:`["python", "kotlin", "java"]`   | -         | The programming language that the code is written in. If no programming language is defined, an educated guess will be made and redirected to the endpoint with the guess. It is strongly recommended you set the language instead of letting it guess. |
| `mode`       |          | string:`['dark', 'dracula', 'classic']` | `classic` | The mode in which the highlighted colors should be displayed. This parameter is optional and by default `classic` will be chosen.                                                                                                                       |

#### Responses

##### 200 OK

Returns the highlighted code

**Example response:**

```json
{
  "sourceCode": "print('Hello, world!')",
  "formalFormatting": "<span style='color: #880000'>import</span>",
  "mlFormatting": "<span style='color: #880000'>import</span>"
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

### `POST /highlight-file`
#### Parameters

| Parameter | Required | Type                                    | default   | Description                                                                                                                       |
| --------- | -------- | --------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `file`    | ✅        | Express.Multer.File                     | -         | The file which should be highlighted.                                                                                             |
| `mode`    |          | string:`['dark', 'dracula', 'classic']` | `classic` | The mode in which the highlighted colors should be displayed. This parameter is optional and by default `classic` will be chosen. |

#### Responses
**Example response (Headers):**

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

### `POST /highlight-file-html`
#### Parameters

| Parameter | Required | Type                                    | default   | Description                                                                                                                       |
| --------- | -------- | --------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `file`    | ✅        | Express.Multer.File                     | -         | The file which should be highlighted.                                                                                             |
| `mode`    |          | string:`['dark', 'dracula', 'classic']` | `classic` | The mode in which the highlighted colors should be displayed. This parameter is optional and by default `classic` will be chosen. |

#### Responses

```json
{
  "sourceCode": "print('Hello, world!')",
  "formalFormatting": "<span style='color: #880000'>import</span>",
  "mlFormatting": "<span style='color: #880000'>import</span>"
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
