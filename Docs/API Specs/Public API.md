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

##### 302 Found

##### 400 Bad Request

##### 413 Payload Too Large



### `/highlight-file`

