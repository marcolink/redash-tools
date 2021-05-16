import {Redash} from "../types/redash";
import {request} from '../request'
import {snapshot} from '../snapshot'
import {
    GetQueriesParameter,
    GetQueryParameter,
    QueriesClient,
    RedashClientConfig,
} from '../types/common'

export function queriesClient(clientConfig: RedashClientConfig): QueriesClient {
    return {
        list: query => request<Redash.RedashCollectionResult<Redash.Query>, GetQueriesParameter>({
            clientConfig,
            path: '/queries',
            method: 'GET',
            query
        }),
        get: query => request<Redash.Query, GetQueryParameter>({
            clientConfig,
            path: `/queries/${query.id}`,
            method: 'GET',
            query
        }),
        snapshot: query => snapshot(clientConfig, query),
    }
}
