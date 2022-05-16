# API Design for hCode Colorizer

## Endpoints

### `GET /color-text`

#### Parameters

| Parameter | Required | Type                                  | default |
| --------- | -------- | ------------------------------------- | ------- |
| `mode`    | ✅        | string:`["dracula", "dark", "classic"]` | -       |
| `content`    | ✅        | JSON:`[{"hCodeValue": 0,"startIndex": 0 "endIndex": , "tokenId": 42}]` | -       |

#### Responses

##### 200 OK

Returns the colors corresponding to the hCode values.

**Example response:**

```json
[
    {"hexcode": "#ffffff", "startIndex": 0, "endIndex": 1},
    ...
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

### `GET /color-text-html`

#### Parameters

| Parameter | Required | Type                                  | default |
| --------- | -------- | ------------------------------------- | ------- |
| `mode`    | ✅       | string:`["dracula", "dark", "classic"]` | -       |
| `content` | ✅       | JSON:`{"hCodes":[{"hCodeValue": 0,"startIndex": 0 "endIndex": , "tokenId": 42}], "text":"This is a test"}` | -       |

#### Responses

##### 200 OK

Returns the colors corresponding to the hCode values.

**Example response:**

```json
[
    "span style=\"color: #ffffff\">t</span>", "span style=\"color: #ffffff\">i</span>",
    ...
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