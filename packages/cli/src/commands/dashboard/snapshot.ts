import Command, {flags} from '@oclif/command'
import * as Listr from 'listr'
import {ListrTask} from 'listr'
import {base} from '../../flags/base'
import {initClient, loadDashboard, createSnapshots} from '../../tasks'
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
    tasks.push(loadDashboard(args.slug, args.path))
    tasks.push(createSnapshots({
      height: flags.height,
      width: flags.width,
      max_age: flags.max_age,
    }))

    await new Listr(tasks, {concurrent: false}).run()

    this.exit()
  }
}
