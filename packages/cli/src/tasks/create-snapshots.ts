import {ListrTaskWrapper} from 'listr'
import {Redash} from 'redash-js-client'
import {Context} from './context'
import PQueue from 'p-queue'

type CreateSnapshotParams = {
  width: number;
  height: number;
  max_age: number;
}

export const createSnapshots = ({width, height, max_age}: CreateSnapshotParams) => {
  return {
    title: 'Create snapshots',
    task: async (ctx: Context, task: ListrTaskWrapper<Context>) => {
      const widgets = ctx.dashboard.widgets
      .filter((widget: Redash.DashboardWidget) => {
        return Boolean(widget.visualization?.query.id)
      })

      const queue = new PQueue({concurrency: 1})

      const total = widgets.length
      let current = 1

      for (const widget of widgets) {
        if (widget.visualization) {
          const queryId = widget.visualization.query.id.toString()
          const visualizationId = widget.visualization.id.toString()
          const path = `${ctx.path}/${queryId}-${visualizationId}.png`
          task.output = `[${current}/${total}] Update query ${ctx.host}/queries/${queryId}#${visualizationId}`
          await queue.add(() => ctx.client.query.getUpdatedResult({id: queryId, max_age}))
          task.output = `[${current}/${total}] Take snapshot ${queryId}/${visualizationId} ${path}`
          await queue.add(() => ctx.client.query.getSnapshot({
            queryId,
            visualizationId,
            path,
            width,
            height,
          }))
          current++
        }
      }

      task.title = `Created snapshots ${ctx.path}`
    },
  }
}
