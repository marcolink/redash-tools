import Command, {flags} from '@oclif/command'

export default abstract class extends Command {
  static flags = {
    token: flags.string({char: 't', description: 'api (query) token', env: 'REDASH_TOKEN'}),
    hostname: flags.string({char: 'n', description: 'redash hostname', default: 'https://redash.io', env: 'REDASH_HOST'}),
  }
}
