import Command, {flags} from '@oclif/command'
import {Redash, redashClient} from 'redash-js-client'
import {base} from '../../flags/base'
import {validateToken} from '../../validations'
import DashboardWidget = Redash.DashboardWidget;

export default class DashboardSnapshot extends Command {
  static description = 'Returns a dashboards charts as png'

  static examples = [
    '$ redash-cli dashboard:snapshot my-dashboard-slug ./local/snapshots/directory',
  ]

  static flags = {
    ...base,
    width: flags.integer({char: 'x', description: 'snapshot width', default: 800}),
    height: flags.integer({char: 'y', description: 'snapshot height', default: 600}),
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

    const promises = dashboard.widgets.reduce((previousValue: Promise<void>[], widget: DashboardWidget) => {
      if (widget.visualization) {
        const queryId = widget.visualization.query.id
        const visualizationId = widget.visualization.id
        const path = `${args.path}/${queryId}-${visualizationId}.png`
        previousValue.push(
          (async () => {
            this.log(`create snapshot ${path}`)
            await client.query.getSnapshot({
              queryId: queryId,
              visualizationId: visualizationId,
              path: path,
              width: flags.width,
              height: flags.height,
            })
          })()
        )
      }
      return previousValue
    }, [])

    await Promise.allSettled(promises)
    this.log('finished snapshot process')
    this.exit()
  }
}
