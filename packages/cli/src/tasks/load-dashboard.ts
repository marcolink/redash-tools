import {ListrTaskWrapper} from 'listr'
import {Context} from './context'

export const loadDashboard = (slug: string) => {
  return {
    title: `Load dashboard "${slug}"`,
    task: async (ctx: Context, task: ListrTaskWrapper<Context>) => {
      task.output = `Loading dashboard "${slug}"`
      ctx.dashboard = await ctx.client.dashboard.getOne({slug})
      task.title = `Loaded dashboard ${ctx.host}/dashboard/${slug}"`
    },
  }
}
