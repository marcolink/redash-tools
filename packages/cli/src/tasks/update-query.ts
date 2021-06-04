import {ListrTaskWrapper} from 'listr'
import {Context} from './context'

export const updateQuery = (id: string, max_age: number) => {
  return {
    title: 'Update query',
    task: async (ctx: Context, task: ListrTaskWrapper<Context>) => {
      task.output = 'Updating query ...'
      await ctx.client.query.getUpdatedResult({id, max_age})
      task.title = 'Updated query'
    },
  }
}
