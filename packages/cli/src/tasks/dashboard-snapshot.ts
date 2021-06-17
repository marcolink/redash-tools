import {mkdir} from 'fs/promises'
import Listr from 'listr'
import PQueue from 'p-queue'
import {Redash} from 'redash-js-client'
import {querySnapshot} from 'redash-snapshot'
import {ClientContext, DashboardContext, HostContext, TokenContext} from './context'

type CreateSnapshotParams = {
  width: number;
  height: number;
  max_age: number;
}

type CreateSnapshotsContext = ClientContext & DashboardContext & HostContext & TokenContext

export function dashboardSnapshot<TContext extends CreateSnapshotsContext>(slug: string, dir: string, {
  width,
  height,
  max_age,
}: CreateSnapshotParams): Listr.ListrTask<TContext> {
  return {
    title: 'Create snapshots',
    task: async (ctx, task) => {
      const widgets = ctx.dashboard.widgets
      .filter((widget: Redash.DashboardWidget) => {
        return Boolean(widget.visualization?.query.id)
      })

      const dirPath = `${dir}/${slug}/${new Date().toISOString()}`
      await mkdir(dirPath, {recursive: true})

      const queue = new PQueue({concurrency: 1})

      const total = widgets.length
      let current = 1

      for (const widget of widgets) {
        if (widget.visualization) {
          const queryId = widget.visualization.query.id.toString()
          const visualizationId = widget.visualization.id.toString()
          const path = `${dirPath}/${widget.visualization?.query.name} ${queryId}-${visualizationId}.png`
          task.output = `[${current}/${total}] Update query ${ctx.host}/queries/${queryId}#${visualizationId}`
          await queue.add(() => ctx.client.query.getUpdatedResult({id: queryId, max_age}))
          task.output = `[${current}/${total}] Take snapshot ${queryId}/${visualizationId} > ${path}`
          await queue.add(() => querySnapshot({
            token: ctx.token,
            host: ctx.host,
            queryId,
            visualizationId,
            path,
            width,
            height,
          }))
          current++
        }
      }

      task.title = `Created snapshots ${dirPath}`
    },
  }
}
