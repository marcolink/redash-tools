import Listr = require('listr');
import Command, {flags} from '@oclif/command'
import {base} from '../../flags'
import {initClient, QueryManyContext} from '../../tasks'
import {stringify} from '../../utils'
import {validateToken} from '../../validations'

export default class QueryMany extends Command {
  static description = 'Returns a paginated array of query objects'

  static examples = ['$ redash-cli query:many']

  static flags = {
    ...base,
    page_size: flags.integer({char: 's', description: 'page size', default: 25}),
    page: flags.integer({char: 'p', description: 'page index', default: 1}),
    query: flags.string({char: 'q', description: 'search query string'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(QueryMany)

    validateToken(this, flags.token)

    const context = await new Listr<QueryManyContext>([
      initClient(flags.hostname!, flags.token!),
      {
        title: 'Load dashboard"',
        task: async (ctx, task) => {
          task.output = 'query many'
          ctx.result = await ctx.client.query.getMany({
            q: flags.query,
            page_size: flags.page_size,
            page: flags.page,
          })
          task.title = 'queried many'
        },
      },
    ], {concurrent: false}).run()

    this.log(stringify(context.result))
  }
}
