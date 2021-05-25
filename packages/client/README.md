# Redash.io javascript client
[![Version](https://img.shields.io/npm/v/redash-js-client.svg)](https://npmjs.org/package/redash-js-client)
[![Downloads/week](https://img.shields.io/npm/dw/redash-js-client.svg)](https://npmjs.org/package/redash-js-client)
[![License](https://img.shields.io/npm/l/redash-js-client.svg)](https://github.com/marcolink/redash-js-client/blob/master/package.json)

A javascript client for [redash](https://redash.io) API.

# Installation
```
npm install redash-js-client
```
or
```
yarn add redash-js-client
```
# Usage

### Client initialization 
```js
import {redashClient} from 'redash-js-client'

const client = redashClient();
```

### Client configuration
```js
const client = redashClient({
    host: 'https://custom.redash.host.com', 
    token: 'my-user-token'
});
```

### Sub clients
All clients expect the same shape of configuration.
- `query` Query object API
- `dashboard` Dashboard object API

You can access sub clients through `redashClient` directly.

```js
const client = redashClient();
client.query.getMany().then(console.log)
```

or instantiate them independently
```js
import {queryClient} from 'redash-js-client'

const client = queryClient();
client.getMany().then(console.log)
```

#### Query Client
**Methods**
- `getOne`
- `getMany`
- `getJob`  
- `getCachedResult`
- `getUpdatedResult`
- `getSnapshot`

#### Dashboard Client
**Methods**
- `getOne`
- `getMany`
- `getFavorites`

## References
- [redash.io API](https://redash.io/help/user-guide/integrations-and-api/api) 
