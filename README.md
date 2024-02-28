This is an example repo to show an issue in how Nock handles a ReadStream within the body of a request it is intercepting.  A change in Node 20.10.0 seems to have modified ReadStream in a way that Nock cannot handle. 

Clone this repo then run the following commands:
- `cd nock-stream-test`
- `npm install` or `yarn`
- `nvm use 20.9.0`
- `npm run test` or `yarn test`
  - The test should pass
- `nvm use 20.10.0`
- `npm run test` or `yarn test`
  - The test should hang until the test timeout is reached, then fail

This test creates a ReadStream of `__tests__/test.txt`, then uses got to send the ReadStream as the body of an http request. Nock intercepts the request, but never returns a response.

If using vscode you can use the included debugger launch scripts to test in either node 20.9.0 or 20.10.0. Nock debug logs are enabled.

```
nock.request_overrider request write +0ms
nock.request_overrider request end +0ms
```
Tests in both node 20.9.0 and 20.10.0 get to the `nock.request_overrider request write`, but node 20.10.0 hangs and never gets to `nock.request_overrider request end`. Maybe the stream is never closed?