import Command from '@oclif/command'
import {Listr} from 'listr2'
import {base} from '../../flags'
import {initClient, QueryJobContext} from '../../tasks'
import {stringify} from '../../utils'
import {validateToken} from '../../validations'

export default class QueryJob extends Command {
  static description = 'Returns queries Job status object'

  static examples = ['$ redash-cli query:job 1234']

  static flags = {
    ...base,
  }

  static args = [{
    name: 'jobId',
    required: true,
    description: 'job id',
  }]

  async run() {
    const {flags, args} = this.parse(QueryJob)

    validateToken(this, flags.token)

    const context = await new Listr<QueryJobContext>([
      initClient(flags.hostname!, flags.token!),
      {
        title: 'Load Job',
        task: async (ctx, task) => {
          task.output = `loading job ${args.jobId}`
          ctx.result = await ctx.client.query.getJob({id: args.jobId})
          task.title = `loaded job ${args.jobId}`
        },
      },
    ], {concurrent: false, rendererSilent: flags.json}).run()

    this.log(stringify(context.result))
    return context.result
  }
}
