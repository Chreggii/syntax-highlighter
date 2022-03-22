# Public API specification

* Requests are done without authentication.

## Endpoints

### `GET /highlight-text`

#### Parameters

| Parameter     | Required | Type                                  | default | Description                                                  |
| ------------- | -------- | ------------------------------------- | ------- | ------------------------------------------------------------ |
| `source-text` | ✅        | URL-encoded string                    | -       | The source code that is to be highlighted. This source-code must be URL-encoded. |
| `language`    | ✅        | string:`["python", "kotlin", "java"]` | -       | The programming language that the code is written in. If no programming language is defined, an educated guess will be made and redirected to the endpoint with the guess. It is strongly recommended you set the language instead of letting it guess. |

#### Responses

##### 200 OK

Returns the highlighted code

##### 400 Bad Request

Requests might be missing a required parameter or is badly encoded.

**Examples response:**

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

**Examples response:**

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

Parameters are the same as the `GET` request. 

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

**Examples response:**

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

**Examples response:**

```json
{
  "error": {
    "code": 413,
    "type": "Payload Too Large",
    "reasons": "Your provided file is too large, max allowed is xxx, request is xxx long."
  }
}
```

