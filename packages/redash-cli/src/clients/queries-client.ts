
import {GetQueriesParameter, GetQueryParameter, QueriesClient, Query, RedashClientConfig, RedashCollectionResult} from '../types'

import {request} from '../request'

export function queriesClient(clientConfig: RedashClientConfig): QueriesClient {
  return {
    getMany: query => request<RedashCollectionResult<Query>, GetQueriesParameter>({clientConfig, path: '/queries', method: 'GET', query}),
    get: query => request<Query, GetQueryParameter>({clientConfig, path: `/queries/${query.id}`, method: 'GET', query}),
  }
}
