import Command, {flags} from '@oclif/command'
import {queriesClient} from 'redash-js-client'
import {base} from '../../flags/base'

export default class QueriesSnapshot extends Command {
  static description = 'Returns a query chart as png'

  static examples = [
    '$ redash-cli queries:snapshot 1234 5678 ./local/snapshots/directory',
  ]

  static flags = {
    ...base,
    width: flags.integer({char: 'w', description: 'snapshot width', default: 800}),
    height: flags.integer({char: 'h', description: 'snapshot height', default: 600}),
  }

  static args = [
    {
      name: 'queryId',
      required: true,
      description: 'query id',
    },
    {
      name: 'visualizationId',
      required: true,
      description: 'query id',
    },
    {
      name: 'path',
      required: false,
      description: 'directory path for snapshot png',
    },
  ]

  async run() {
    const {flags, args} = this.parse(QueriesSnapshot)
    const path = args.path ? `${args.path}/${args.queryId}-${args.visualizationId}.png` : undefined
    const client = queriesClient({host: flags.hostname!, token: flags.token})

    await client.snapshot({
      queryId: args.queryId,
      visualizationId: args.visualizationId,
      path: path,
      width: flags.width,
      height: flags.height,
    })

    this.exit(0)
  }
}
