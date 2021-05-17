import Command, {flags} from '@oclif/command'
import {queryClient} from 'redash-js-client'
import {base} from '../../flags/base'
import {stringify} from '../../utils'
import {validateToken} from '../../validations'

export default class QueryUpdate extends Command {
  static description = 'Returns queries Job status object'

  static examples = ['$ redash-cli query:update 1234 "{number_param:0,date_param:"2020-01-01"}"']

  static flags = {
    ...base,
    max_age: flags.integer({
      char: 'm',
      description: 'max age of query result',
      default: 0,
    }),
  }

  static args = [{
    name: 'queryId',
    required: true,
    description: 'query id',
  }, {
    name: 'parameters',
    required: false,
    description: 'query parameters',
  }]

  async run() {
    const {flags, args} = this.parse(QueryUpdate)

    validateToken(this, flags.token)

    const client = queryClient({host: flags.hostname!, token: flags.token})
    const result = await client.getUpdatedResult({id: args.queryId, parameters: args.parameters, max_age: flags.max_age})

    this.log(stringify(result))
  }
}
