import Command from '@oclif/command'
import {queriesClient} from 'redash-js-client'
import {base} from '../../flags/base'
import {stringify} from '../../utils'
import {validateToken} from '../../validations'

export default class QueryOne extends Command {
  static description = 'Returns a a single query object'

  static examples = ['$ redash-cli query:one 1234']

  static flags = {
    ...base,
  }

  static args = [{
    name: 'queryId',
    required: true,
    description: 'query id',
  }]

  async run() {
    const {flags, args} = this.parse(QueryOne)

    validateToken(this, flags.token)

    const client = queriesClient({host: flags.hostname!, token: flags.token})
    const result = await client.one({id: args.queryId})

    this.log(stringify(result))
  }
}
