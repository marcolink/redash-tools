import {ListrTaskWrapper} from 'listr'
import {Context} from './context'

type CreateSnapshotParams = {
  queryId: string;
  visualizationId: string;
  width: number;
  height: number;
  path: string;
}

export const createSnapshot = ({queryId, visualizationId, width, height, path}: CreateSnapshotParams) => {
  return {
    title: 'Create snapshot',
    task: async (ctx: Context, task: ListrTaskWrapper<Context>) => {
      task.output = 'creating snapshot'
      await ctx.client.query.getSnapshot({
        queryId,
        visualizationId,
        path,
        width,
        height,
      })
      task.title = 'Created snapshot'
    },
  }
}
