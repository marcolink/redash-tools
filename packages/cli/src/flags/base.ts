import {flags} from '@oclif/command'

export const base = {
  help: flags.help({char: 'h'}),
  token: flags.string({char: 't', description: 'api (query) token', env: 'REDASH_TOKEN'}),
  hostname: flags.string({char: 'n', description: 'redash hostname', default: 'https://redash.io', env: 'REDASH_HOST'}),
  json: flags.boolean({ description: 'only output JSON response', default: false}),
}
