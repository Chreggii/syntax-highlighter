# Public API specification

* Requests are done without authentication.

## Endpoints

### `/highlight-text`

#### Paramaters

| Parameter     | Required | Type                                          | default | Description                                                  |
| ------------- | -------- | --------------------------------------------- | ------- | ------------------------------------------------------------ |
| `source-text` | ✅        | URL-endoced string                            | -       | The source code that is to be highlighted. This source-code must be URL-encoded. |
| `language`    | ❌        | string:`["python", "kotlin", "java", "auto"]` | auto    | The programming language that the code is writte in. If no programming language is defined an educated guess will be made and redirected to the enpoint with the guess. It is stronlgy recommended you set the language instead of letting it guess. |

#### Responses

##### 200 OK

Returns the highlighted code

##### 302 Found

If you don't provide the language (or the language is set to `auto`) you will be redirected to the endpoint with the lanauge given.

##### 400 Bad Request

Requests might be missing a required parameter or is badly encoded.

##### 413 Payload Too Large

Sometimey the source-text was too large and therefore we can't give you a proper reply.

### `/highlight-file`

