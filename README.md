# `google-safe-browsing`

`google-safe-browsing` is an abstract wrapper around the Google Safe Browsing API v4.

This library is still a work in progress, only two methods are supported so far, but more is in the works.

## Installation

Using `yarn`:

```bash
yarn add google-safe-browsing
```

Using `npm`:

```bash
npm install google-safe-browsing
```

## Usage

`google-safe-browsing` is based on a class that is initialised as follows:

```javascript
const { GoogleSafeBrowsingClient } = require("google-safe-browsing");

const client = new GoogleSafeBrowsingClient("YOUR-API-KEY");
```

### `lookupUrl`

Returns an object as specified [here](https://developers.google.com/safe-browsing/v4/reference/rest/v4/threatMatches/find#response-body).

```javascript
await client.lookupUrl("example.com");

await client.lookupUrl(["example.com", "example.net"]);
```

### `isUrlSafe`

Returns `true` or `false` depending on whether the URL is safe.

```javascript
await client.isUrlSafe("example.com");
// => true

await client.isUrlSafe("some-creepy-virus-distributor.com");
/// => false
```

## License

Copyright (C) 2021 Marvin Schopf

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
