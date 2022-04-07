# API Design for Machine Learning Highlighter

## Endpoints

### `GET /ml-highlight`

#### Parameters

| Parameter  | Required | Type                                  | Description                                                  |
| ---------- | -------- | ------------------------------------- | ------------------------------------------------------------ |
| `lexing`   | ✅        | URL-Encoded list                      | An array describing the output from the lexting data. The array has to be ordered properly to ensure correct output: `[...tokenIds]`. |
| `language` | ✅        | string:`["python", "kotlin", "java"]` | The programming language that the code is written in.        |

#### Responses

##### 200 OK

Returns the data from the machine learning highlighter, in the following format: `[...hCodeValues]`. If the ML model is working properly the first three items of every list item should be the same as the provided lexing data.

**Example response:**

```json
[
  11, 13, 4, 2, 1, 4, 5, 12
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

### `GET /ml-train`

#### Parameters

| Parameter      | Required | Type                                  | Description                                                  |
| -------------- | -------- | ------------------------------------- | ------------------------------------------------------------ |
| `lexing`       | ✅        | URL-encoded list                      | An array describing the output from the lexting data. The array has to be ordered properly to ensure correct output: `[...tokenIds]`. |
| `highlighting` | ✅        | URL-encoded list                      | An array that contains the training data that corresponds to the lexing data: `[...hCodeValues]` |
| `language`     | ✅        | string:`["python", "kotlin", "java"]` | The programming language that the code is written in.        |

#### Responses

##### 204 No Content

The machine learning service has received the data and will train on it. It is not guaranteed that the training will take place immediatly.

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

