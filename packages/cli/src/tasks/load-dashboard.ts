import {mkdir} from 'fs/promises'
import {ListrTaskWrapper} from 'listr'
import {Context} from './context'

export const loadDashboard = (slug: string, dir: string) => {
  return {
    title: 'Load dashboard"',
    task: async (ctx: Context, task: ListrTaskWrapper<Context>) => {
      task.output = `Loading dashboard "${slug}"`
      const path = await mkdir(`${dir}/${slug}/${new Date().toISOString()}`, {recursive: true})
      if (!path) {
        throw new Error('can\'t create output path')
      }
      ctx.path = path
      ctx.dashboard = await ctx.client.dashboard.getOne({slug})
      task.title = 'Loaded dashboard'
    },
  }
}
