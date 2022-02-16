import Listr from 'listr2'
import {redashClient} from 'redash-js-client'
import {ClientContext, HostContext, TokenContext} from './context'

type InitClientContext = HostContext & ClientContext & TokenContext

export function initClient<TContext extends InitClientContext>(host: string, token: string): Listr.ListrTask<TContext> {
  return {
    title: 'Init',
    task: async (ctx, task) => {
      if (!host) {
        throw new Error('no host provided')
      }

      if (!token) {
        throw new Error('no token provided')
      }

      ctx.token = token
      ctx.host = host
      ctx.client = redashClient({host, token})
      task.title = 'Initialized'
    },
  }
}
