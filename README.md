# mock server

Simple mock API server by express.

## Usage

Create file prefix with `api` and use esm export json.

The object key value `${METHOD} ${PATH}` or `${PATH}`, the value is response body.

Example:

- `GET /api/test` is serve a `/api/test` on get http method.
- `/api/test` is serve a `/api/test` on all http method.
