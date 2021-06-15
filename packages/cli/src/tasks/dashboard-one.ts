import Listr from 'listr'
import {ClientContext, DashboardContext} from './context'

type LoadDashboardContext = ClientContext & DashboardContext

export function dashboardOne<TContext extends LoadDashboardContext>(slug: string): Listr.ListrTask<TContext> {
  return {
    title: 'Load dashboard"',
    task: async (ctx, task) => {
      task.output = `Loading dashboard "${slug}"`
      ctx.dashboard = await ctx.client.dashboard.getOne({slug})
      task.title = 'Loaded dashboard'
    },
  }
}
