# API Design for hCode Colorizer

## Endpoints

### `GET /color-scheme`

#### Parameters

| Parameter | Required | Type                                  | default |
| --------- | -------- | ------------------------------------- | ------- |
| `mode`    | ✅        | string:`["default", "dark", "grey"]` | -       |

#### Responses

##### 200 OK

Returns the colors corresponding to the hCode values.

**Example response:**

```json
[
    {
      "hcode": 0,
      "name": "ANY",
      "hexcode": "#00000"
    },
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