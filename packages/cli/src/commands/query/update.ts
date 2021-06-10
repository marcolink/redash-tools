import Command, {flags} from '@oclif/command'
import Listr from 'listr'
import {base} from '../../flags'
import {initClient, QueryUpdateContext} from '../../tasks'
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

    const context = await new Listr<QueryUpdateContext>([
      initClient(flags.hostname!, flags.token!),
      {
        title: 'Update Query',
        task: async (ctx, task) => {
          task.output = `updating ${args.queryId}`
          ctx.result = await ctx.client.query.getUpdatedResult({
            id: args.queryId,
            parameters: args.parameters,
            max_age: flags.max_age,
          })
          task.title = `Updated ${args.queryId}`
        },
      },
    ], {concurrent: false}).run()

    this.log(stringify(context.result))
  }
}
