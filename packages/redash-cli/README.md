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
* [`redash-cli queries`](#redash-cli-queries)

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

## `redash-cli queries`

Returns a paginated array of query objects

```
Returns a paginated array of query objects

USAGE
  $ redash-cli queries

OPTIONS
  -h, --help                 show CLI help
  -n, --hostname=hostname    [default: https://redash.io] redash hostname
  -p, --page=page            [default: 1] page
  -s, --search=search        search query
  -t, --token=token          api (query) token
  -z, --page_size=page_size  [default: 25] page size

EXAMPLE
  $ redash-cli queries
```

_See code: [src/commands/queries.ts](https://github.com/marcolink/redash-cli/blob/v0.0.0/src/commands/queries.ts)_
<!-- commandsstop -->
