redash-cli
==========

Simple CLI to for redash.io

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/redash-cli.svg)](https://npmjs.org/package/redash-cli)
[![Downloads/week](https://img.shields.io/npm/dw/redash-cli.svg)](https://npmjs.org/package/redash-cli)
[![License](https://img.shields.io/npm/l/redash-cli.svg)](https://github.com/marcolink/redash-cli/blob/master/package.json)

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
redash-cli/0.0.0 darwin-x64 node-v13.8.0
$ redash-cli --help [COMMAND]
USAGE
  $ redash-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redash-cli help [COMMAND]`](#redash-cli-help-command)
* [`redash-cli queries:list`](#redash-cli-querieslist)
* [`redash-cli queries:snapshot QUERYID VISUALIZATIONID [PATH]`](#redash-cli-queriessnapshot-queryid-visualizationid-path)

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

## `redash-cli queries:list`

Returns a paginated array of query objects

```
Returns a paginated array of query objects

USAGE
  $ redash-cli queries:list

OPTIONS
  -h, --help                 show CLI help
  -n, --hostname=hostname    [default: https://redash.io] redash hostname
  -p, --page=page            [default: 1] page index
  -q, --query=query          search query string
  -s, --page_size=page_size  [default: 25] page size
  -t, --token=token          api (query) token

EXAMPLE
  $ redash-cli queries:list
```

_See code: [src/commands/queries/list.ts](https://github.com/marcolink/redash-cli/blob/v0.0.0/src/commands/queries/list.ts)_

## `redash-cli queries:snapshot QUERYID VISUALIZATIONID [PATH]`

Returns a query chart as png

```
Returns a query chart as png

USAGE
  $ redash-cli queries:snapshot QUERYID VISUALIZATIONID [PATH]

ARGUMENTS
  QUERYID          query id
  VISUALIZATIONID  query id
  PATH             directory path for snapshot png

OPTIONS
  -h, --height=height      [default: 600] snapshot height
  -h, --help               show CLI help
  -n, --hostname=hostname  [default: https://redash.io] redash hostname
  -t, --token=token        api (query) token
  -w, --width=width        [default: 800] snapshot width

EXAMPLE
  $ redash-cli queries:snapshot 1234 4561 ./local/snapshots/directory
```

_See code: [src/commands/queries/snapshot.ts](https://github.com/marcolink/redash-cli/blob/v0.0.0/src/commands/queries/snapshot.ts)_
<!-- commandsstop -->
