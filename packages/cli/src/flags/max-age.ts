import {flags} from '@oclif/command'

export const maxAge = {
  max_age: flags.integer({char: 'a', description: 'max age (seconds) for cached result', default: 60 * 60 * 24}),
}

