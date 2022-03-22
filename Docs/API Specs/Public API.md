# Public API specification

* Requests are done without authentication.

## Endpoints

### `/highlight-text`

#### Paramaters

| Parameter   | Required | Type                                         | default | Description                                |
| ----------- | -------- | -------------------------------------------- | ------- | ------------------------------------------ |
| source-text | ✅        | URL-endoced string                           | -       | The source code that is to be highlighted. |
| language    | ❌        | string: ["python", "kotlin", "java", "auto"] | auto    |                                            |

#### Responses

##### 200 OK

##### 302 Found

##### 400 Bad Request

##### 413 Payload Too Large



### `/highlight-file`

