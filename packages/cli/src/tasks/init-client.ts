import {ListrTaskWrapper} from 'listr'
import {redashClient} from 'redash-js-client'
import {Context} from './context'

export const initClient = (host: string, token: string) => {
  return {
    title: 'Init client',
    task: async (ctx: Context, task: ListrTaskWrapper<Context>) => {
      ctx.host = host
      ctx.client = redashClient({host, token})
      task.title = 'Client initialized'
    },
  }
}
