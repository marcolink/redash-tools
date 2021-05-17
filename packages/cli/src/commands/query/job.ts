import Command from '@oclif/command'
import {queriesClient} from 'redash-js-client'
import {base} from '../../flags/base'
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

    const client = queriesClient({host: flags.hostname!, token: flags.token})
    const result = await client.job({id: args.jobId})

    this.log(stringify(result))
  }
}
