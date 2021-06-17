# Redash.io query snapshots

[![Version](https://img.shields.io/npm/v/redash-snapshot.svg)](https://npmjs.org/package/redash-snapshot)
[![Downloads/week](https://img.shields.io/npm/dw/redash-snapshot.svg)](https://npmjs.org/package/redash-snapshot)
[![License](https://img.shields.io/npm/l/redash-snapshot.svg)](https://github.com/marcolink/redash-snapshot/blob/master/package.json)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Create query snapshots (PNG) with node for [redash](https://redash.io).

# Installation

```bash
npm install redash-snapshot
```

or

```bash
yarn add redash-snapshot
```

# Usage

```js
import {querySnapshot} from 'redash-snapshot'

const snapshot = await querySnapshot({
    token: 'my-user-token',
    queryId: 'query-id',
    visualizationId: 'visualization-id'
});
```

### Parameters
|  name          | default                | type |
|----------------|------------------------|----|
| `token`        |                        | string |
| `queryId`      |                        |string|
| `visualizationId`|                      |string|
| `host`         |  `https://redash.io`   |string|
| `path`         |                        |string|
| `width`        | `800`                  |number|
| `height`       |  `600`                 |number|

If `path` is defined, the png will be written to disk at given path. 


## References

- [redash.io API](https://redash.io/help/user-guide/integrations-and-api/api) 
