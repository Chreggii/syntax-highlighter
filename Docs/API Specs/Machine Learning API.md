# API Design for Machine Learning Highlighter

## Endpoints

### `GET /ml-highlight`

#### Parameters

| Parameter  | Required | Type                                  | default | Description                                                  |
| ---------- | -------- | ------------------------------------- | ------- | ------------------------------------------------------------ |
| `lexing`   | ✅        | URL-encoded string                    | -       | An array describing the output from the lexting data. The array has to be ordered properly to ensure correct output: `[<startIndex>, <endIndex>, <tokenId>]`. |
| `language` | ✅        | string:`["python", "kotlin", "java"]` | -       | The programming language that the code is written in.        |

#### Responses

##### 200 OK

Returns the data from the machine learning highlighter, in the following format: `[<startIndex>, <endIndex>, <tokenId>,<hCodeValue>]`. If the ML model is working properly the first three items of every list item should be the same as the provided lexing data.

**Example response:**

```json
[
  [0, 4, 42, 9], 
  [5, 5, 54, 0], 
  [6, 20, 3, 3],
  [21, 21, 55, 0]
]
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
