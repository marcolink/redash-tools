redash-cli
==========

Simple CLI to for redash.io

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/redash-cli.svg)](https://npmjs.org/package/redash-cli)
[![Downloads/week](https://img.shields.io/npm/dw/redash-cli.svg)](https://npmjs.org/package/redash-cli)
[![License](https://img.shields.io/npm/l/redash-cli.svg)](https://github.com/marcolink/redash-cli/blob/master/package.json)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g redash-cli
$ redash-cli COMMAND
running command...
$ redash-cli (-v|--version|version)
redash-cli/0.2.2 darwin-x64 node-v14.16.1
$ redash-cli --help [COMMAND]
USAGE
  $ redash-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redash-cli dashboard:one SLUG`](#redash-cli-dashboardone-slug)
* [`redash-cli dashboard:snapshot SLUG PATH`](#redash-cli-dashboardsnapshot-slug-path)
* [`redash-cli help [COMMAND]`](#redash-cli-help-command)
* [`redash-cli query:job JOBID`](#redash-cli-queryjob-jobid)
* [`redash-cli query:many`](#redash-cli-querymany)
* [`redash-cli query:one QUERYID`](#redash-cli-queryone-queryid)
* [`redash-cli query:snapshot QUERYID VISUALIZATIONID PATH`](#redash-cli-querysnapshot-queryid-visualizationid-path)
* [`redash-cli query:update QUERYID [PARAMETERS]`](#redash-cli-queryupdate-queryid-parameters)

## `redash-cli dashboard:one SLUG`

Returns a collection of dashboard query pngs

```
Returns a collection of dashboard query pngs

USAGE
  $ redash-cli dashboard:one SLUG

ARGUMENTS
  SLUG  dashboard slug

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token

EXAMPLE
  $ redash-cli dashboard:one my-dashboard-slug
```

_See code: [src/commands/dashboard/one.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/dashboard/one.ts)_

## `redash-cli dashboard:snapshot SLUG PATH`

Returns a collection of dashboard query pngs

```
Returns a collection of dashboard query pngs

USAGE
  $ redash-cli dashboard:snapshot SLUG PATH

ARGUMENTS
  SLUG  dashboard slug
  PATH  directory path for snapshot png

OPTIONS
  -a, --max_age=max_age    [default: 86400] max age (seconds) for cached result
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token
  -x, --width=width        [default: 1200] snapshot width
  -y, --height=height      [default: 900] snapshot height

EXAMPLE
  $ redash-cli dashboard:snapshot my-dashboard-slug ./local/snapshots/directory
```

_See code: [src/commands/dashboard/snapshot.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/dashboard/snapshot.ts)_

## `redash-cli help [COMMAND]`

display help for redash-cli

```
display help for <%= config.bin %>

USAGE
  $ redash-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `redash-cli query:job JOBID`

Returns queries Job status object

```
Returns queries Job status object

USAGE
  $ redash-cli query:job JOBID

ARGUMENTS
  JOBID  job id

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token

EXAMPLE
  $ redash-cli query:job 1234
```

_See code: [src/commands/query/job.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/query/job.ts)_

## `redash-cli query:many`

Returns a paginated array of query objects

```
Returns a paginated array of query objects

USAGE
  $ redash-cli query:many

OPTIONS
  -h, --help                 show CLI help
  -n, --hostname=hostname    [default: https://redash.io] redash hostname
  -p, --page=page            [default: 1] page index
  -q, --query=query          search query string
  -s, --page_size=page_size  [default: 25] page size
  -t, --token=token          api (query) token

EXAMPLE
  $ redash-cli query:many
```

_See code: [src/commands/query/many.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/query/many.ts)_

## `redash-cli query:one QUERYID`

Returns a a single query object

```
Returns a a single query object

USAGE
  $ redash-cli query:one QUERYID

ARGUMENTS
  QUERYID  query id

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token

EXAMPLE
  $ redash-cli query:one 1234
```

_See code: [src/commands/query/one.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/query/one.ts)_

## `redash-cli query:snapshot QUERYID VISUALIZATIONID PATH`

Returns a query chart as png

```
Returns a query chart as png

USAGE
  $ redash-cli query:snapshot QUERYID VISUALIZATIONID PATH

ARGUMENTS
  QUERYID          query id
  VISUALIZATIONID  visualization id
  PATH             directory path for snapshot png

OPTIONS
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token
  -x, --width=width        [default: 800] snapshot width
  -y, --height=height      [default: 600] snapshot height

EXAMPLE
  $ redash-cli query:snapshot 1234 5678 ./local/snapshots/directory
```

_See code: [src/commands/query/snapshot.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/query/snapshot.ts)_

## `redash-cli query:update QUERYID [PARAMETERS]`

Returns queries Job status object

```
Returns queries Job status object

USAGE
  $ redash-cli query:update QUERYID [PARAMETERS]

ARGUMENTS
  QUERYID     query id
  PARAMETERS  query parameters

OPTIONS
  -h, --help               show CLI help
  -m, --max_age=max_age    max age of query result
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token

EXAMPLE
  $ redash-cli query:update 1234 "{number_param:0,date_param:"2020-01-01"}"
```

_See code: [src/commands/query/update.ts](https://github.com/marcolink/redash-tools/blob/v0.2.2/src/commands/query/update.ts)_
<!-- commandsstop -->
