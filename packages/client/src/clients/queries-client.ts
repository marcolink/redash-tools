import {request} from '../request'
import {snapshot} from '../snapshot'
import {
    GetJobParameter,
    GetQueriesParameter,
    GetQueryParameter,
    QueriesClient,
    RedashClientConfig,
} from '../types/common'
import {Redash} from "../types/redash";
import {ensureConfig} from "../utils";

export function queriesClient(clientConfig: RedashClientConfig): QueriesClient {
    return {
        list: query => request<GetQueriesParameter, Redash.RedashCollectionResult<Redash.Query>>(
            ensureConfig(clientConfig, query?.token), {
                path: '/queries',
                method: 'GET',
                query
            }),
        get: query => request<GetQueryParameter, Redash.Query>(
            ensureConfig(clientConfig, query?.token), {
                path: `/queries/${query.id}`,
                method: 'GET',
                query
            }),
        job: query => request<GetJobParameter, Redash.Job>(
            ensureConfig(clientConfig, query?.token),
            {
                path: `/jobs${query.id}`,
                method: 'GET',
                query
            }
        ),
        snapshot: query => snapshot(ensureConfig(clientConfig, query?.token), query),
    }
}
