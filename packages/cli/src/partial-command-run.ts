import Command from '@oclif/command'

type Logger = Pick<Command, 'log'|  'warn' | 'error' | 'exit'>

export function validateToken(logger: Logger, token: string | undefined) {
  if (!token) {
    logger.error('no access token provided')
  }
}
