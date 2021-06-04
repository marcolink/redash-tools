# Redash.io javascript client

[![Version](https://img.shields.io/npm/v/redash-js-client.svg)](https://npmjs.org/package/redash-js-client)
[![Downloads/week](https://img.shields.io/npm/dw/redash-js-client.svg)](https://npmjs.org/package/redash-js-client)
[![License](https://img.shields.io/npm/l/redash-js-client.svg)](https://github.com/marcolink/redash-js-client/blob/master/package.json)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A javascript client for [redash](https://redash.io) API.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Initialization](#client-initialization)
- [Redash Client](#redash-clients)
- [Query Client](#query-client)
    - [`getOne`](#getone)
    - [`getMany`](#getmany)
    - [`getJob`](#getjob)
    - [`getCachedResult`](#getcachedresult)
    - [`getUpdatedResult`](#getupdatedresult)
    - [`getSnapshot`](#getsnapshot)
- [Dashboard Client](#query-client)
  - [`getOne`](#getone)
  - [`getMany`](#getmany)
  - [`getFavorites`](#getjob)
  - [`getSnapshot`](#getsnapshot)
- [Typescript](#typescript)

# Installation

```bash
npm install redash-js-client
```

or

```bash
yarn add redash-js-client
```

# Usage

## Client initialization

```js
import {redashClient} from 'redash-js-client'

const client = redashClient({
    host: 'https://custom.redash.host.com',
    token: 'my-user-token'
});
```

## Sub Clients

All clients expect the same shape of configuration.

- `query` Query object API
- `dashboard` Dashboard object API

You can access sub clients through `redashClient`.

```js
const client = redashClient({token: 'my-user-token'});
client.query.getMany().then(console.log)
```

or instantiate them independently

```js
import {queryClient} from 'redash-js-client'

const client = queryClient({token: 'my-user-token'});
client.getMany().then(console.log)
```

## Query Client

```js
import {queryClient} from 'redash-js-client'

const client = queryClient({token: 'my-user-token'});
```

### Methods

#### `getOne`

Fetch a single query object, returns a redash [Result](src/types/redash.ts#L21) object,

```js
const query = await client.getOne({id: 'query-id'})
```

#### `getMany`

Fetch a list of query objects, returns a [RedashCollectionResult](src/types/redash.ts#L90) object.

```js
const queryCollection = await client.getMany({
    page: 1, 
    page_size: 10, 
    q: 'reports'
})
```

#### `getJob`

Get current job status

```js
const job = await client.getJob({id: 'job-id'})
```

#### `getCachedResult`

Get current job status

```js
const result = await client.getCachedResult({id: 'query-id'})
```

#### `getUpdatedResult`

Updates query and returns new result. 

```js
const result = await client.getUpdatedResult({id: 'query-id', max_age: 60})
```

#### `getSnapshot`

Returns snapshot image of given query/visualization

```js
const snapshot = await client.getSnapshot({
    queryId: 'query-id',
    visualizationId: 'visualization-id'
})
```

Saves image to disk for given query/visualization

```js
const query = await client.getSnapshot({
    queryId: 'query-id',
    visualizationId: 'visualization-id',
    path: 'some/local/directory/path'
})
```

### Dashboard Client

**Methods**

- `getOne`
- `getMany`
- `getFavorites`

# Typescript
This project is completely written in typescript. All functions and objects are fully typed.

## References

- [redash.io API](https://redash.io/help/user-guide/integrations-and-api/api) 
