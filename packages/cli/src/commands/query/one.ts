import Command from '@oclif/command'
import {Listr} from 'listr2'
import {base} from '../../flags'
import {initClient, QueryOneContext} from '../../tasks'
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

    const context = await new Listr<QueryOneContext>([
      initClient(flags.hostname!, flags.token!),
      {
        title: 'Load Query',
        task: async (ctx, task) => {
          task.output = `query ${args.queryId}`
          ctx.result = await ctx.client.query.getOne({id: args.queryId})
          task.title = `query ${args.queryId}`
        },
      },
    ], {concurrent: false, rendererSilent: flags.json}).run()

    this.log(stringify(context.result))
    return context.result
  }
}
