import {flags} from '@oclif/command'
import {queriesClient} from '../../clients/queries-client'
import {stringify} from '../../utils'
import Command from '../base'

export default class QueriesList extends Command {
    static description = 'Returns a paginated array of query objects'

    static examples = [
      '$ redash-cli queries',
    ]

    static flags = {
      ...Command.flags,
      help: flags.help({char: 'h'}),
      page_size: flags.integer({char: 'z', description: 'page size', default: 25}),
      page: flags.integer({char: 'p', description: 'page', default: 1}),
      search: flags.string({char: 's', description: 'search query'}),
    }

    static args = []

    async run() {
      const {flags} = this.parse(QueriesList)

      const client = queriesClient({host: flags.hostname!, token: flags.token})
      const result = await client.getMany({page: flags.page, page_size: flags.page_size, q: flags.search})

      this.log(stringify(result))
    }
}
