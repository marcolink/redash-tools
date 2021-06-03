import Command, {flags} from '@oclif/command'
import PQueue from 'p-queue'
import {redashClient} from 'redash-js-client'
import {base} from '../../flags/base'
import {validateToken} from '../../validations'

export default class DashboardSnapshot extends Command {
  static description = 'Returns a collection of dashboard query pngs'

  static examples = [
    '$ redash-cli dashboard:snapshot my-dashboard-slug ./local/snapshots/directory',
  ]

  static flags = {
    ...base,
    width: flags.integer({char: 'x', description: 'snapshot width', default: 800}),
    height: flags.integer({char: 'y', description: 'snapshot height', default: 600}),
    max_age: flags.integer({char: 'a', description: 'max age (seconds) for cached result', default: 60 * 60 * 24}),
  }

  static args = [
    {
      name: 'slug',
      required: true,
      description: 'dashboard slug',
    },
    {
      name: 'path',
      required: true,
      description: 'directory path for snapshot png',
    },
  ]

  async run() {
    const {flags, args} = this.parse(DashboardSnapshot)

    validateToken(this, flags.token)

    const client = redashClient({host: flags.hostname!, token: flags.token})

    const dashboard = await client.dashboard.getOne({slug: args.slug})

    const queue = new PQueue({concurrency: 1})

    for (const widget of dashboard.widgets) {
      if (widget.visualization) {
        const queryId = widget.visualization.query.id
        const visualizationId = widget.visualization.id
        const path = `${args.path}/${queryId}-${visualizationId}.png`
        await queue.add(async () => this.log(`update query ${queryId}`))
        await queue.add(() => client.query.getUpdatedResult({id: queryId.toString(), max_age: flags.max_age}))
        await queue.add(async () => this.log(`create snapshot for ${queryId}/${visualizationId}`))
        await queue.add(() => client.query.getSnapshot({
          queryId: queryId.toString(),
          visualizationId: visualizationId.toString(),
          path: path,
          width: flags.width,
          height: flags.height,
        }))
        // eslint-disable-next-line no-await-in-loop
        await queue.add(async () => this.log(`snapshot created ${path}`))
      }
    }

    this.log('finished snapshot process')
    this.exit()
  }
}
