# collect-release-changlog

## Usage

The following parameters are supported

| name              | description                     | required |
| ----------------- | ------------------------------- | -------- |
| pull_request_body | the body of pull request        | true     |
| pull_request_head | the head branch of pull request | true     |

## development

- Install the dependencies

```bash
npm install
```

- Package the TypeScript for distribution

```bash
npm run bundle
```

- Run the tests

```bash
$ npm test

PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

- format and test and build the action

  ```bash
  npm run all
  ```
