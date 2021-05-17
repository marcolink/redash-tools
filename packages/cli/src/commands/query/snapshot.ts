import Command, {flags} from '@oclif/command'
import {queriesClient} from 'redash-js-client'
import {base} from '../../flags/base'
import {validateToken} from '../../validations'

export default class QuerySnapshot extends Command {
  static description = 'Returns a query chart as png'

  static examples = [
    '$ redash-cli query:snapshot 1234 5678 ./local/snapshots/directory',
  ]

  static flags = {
    ...base,
    width: flags.integer({char: 'x', description: 'snapshot width', default: 800}),
    height: flags.integer({char: 'y', description: 'snapshot height', default: 600}),
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
      description: 'visualization id',
    },
    {
      name: 'path',
      required: true,
      description: 'directory path for snapshot png',
    },
  ]

  async run() {
    const {flags, args} = this.parse(QuerySnapshot)

    validateToken(this, flags.token)

    const path = `${args.path}/${args.queryId}-${args.visualizationId}.png`
    const client = queriesClient({host: flags.hostname!, token: flags.token})

    this.log('start snapshot process')

    await client.snapshot({
      queryId: args.queryId,
      visualizationId: args.visualizationId,
      path: path,
      width: flags.width,
      height: flags.height,
    })

    this.log('finished snapshot process')
    this.log(`snapshot stored under ${path}`)
    this.exit()
  }
}
