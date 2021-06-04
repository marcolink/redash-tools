import Command, {flags} from '@oclif/command'
import * as Listr from 'listr'
import {ListrTask} from 'listr'
import {Redash} from 'redash-js-client'
import {base} from '../../flags/base'
import {createSnapshot, initClient, loadDashboard, updateQuery} from '../../tasks'
import {Context} from '../../tasks/context'
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

    const tasks: ListrTask[] = []

    tasks.push(initClient(flags.hostname!, flags.token!))
    tasks.push(loadDashboard(args.slug))

    tasks.push({
      title: 'Create snapshots',
      task: (ctx: Context) => {
        return new Listr(ctx.dashboard.widgets
        .filter((widget: Redash.DashboardWidget) => {
          return Boolean(widget.visualization?.query.id)
        })
        .map((widget: Redash.DashboardWidget) => {
          const queryId = widget.visualization?.query.id
          const visualizationId = widget.visualization?.id

          return {
            title: `Query ${queryId}/${visualizationId} ${ctx.host}/queries/${queryId}#${visualizationId}`,
            task: () => {
              const file = `${args.path}/${queryId}-${visualizationId}.png`
              return new Listr([
                updateQuery(queryId!.toString(), flags.max_age),
                createSnapshot({
                  queryId: queryId!.toString(),
                  visualizationId: visualizationId!.toString(),
                  height: flags.height,
                  width: flags.width,
                  path: file,
                }),
              ], {concurrent: false})
            },
          }
        }))
      },
    })

    const runner = new Listr(tasks, {concurrent: false})
    await runner.run().catch(this.log)

    this.exit()
  }
}
