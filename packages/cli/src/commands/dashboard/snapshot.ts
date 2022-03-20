import {Listr} from 'listr2'
import Command, {flags} from '@oclif/command'
import {base, maxAge} from '../../flags'
import {dashboardSnapshot, dashboardOne, DashboardSnapshotContext, initClient} from '../../tasks'
import {validateToken} from '../../validations'

export default class DashboardSnapshot extends Command {
  static description = 'Returns a collection of dashboard query pngs'

  static examples = [
    '$ redash-cli dashboard:snapshot my-dashboard-slug ./local/snapshots/directory',
  ]

  static flags = {
    ...base,
    ...maxAge,
    width: flags.integer({char: 'x', description: 'snapshot width', default: 1200}),
    height: flags.integer({char: 'y', description: 'snapshot height', default: 900}),
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

    await new Listr<DashboardSnapshotContext>([
      initClient(flags.hostname!, flags.token!),
      dashboardOne(args.slug),
      dashboardSnapshot(args.slug, args.path, {
        height: flags.height,
        width: flags.width,
        max_age: flags.max_age,
      }),
    ], {concurrent: false, rendererSilent: flags.json}).run()

    this.exit()
  }
}
