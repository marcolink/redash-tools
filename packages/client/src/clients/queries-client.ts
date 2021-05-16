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
import {mergeToken} from "../utils";
import {hostDefault} from "./defaults";

export function queriesClient(clientConfig: RedashClientConfig): QueriesClient {

    const cc: RedashClientConfig = {...hostDefault, ...clientConfig}

    return {
        list: query => request<Redash.RedashCollectionResult<Redash.Query>, GetQueriesParameter>({
            clientConfig: mergeToken(cc, query?.token),
            path: '/queries',
            method: 'GET',
            query
        }),
        get: query => request<Redash.Query, GetQueryParameter>({
            clientConfig: mergeToken(cc, query?.token),
            path: `/queries/${query.id}`,
            method: 'GET',
            query
        }),
        snapshot: query => snapshot(mergeToken(cc, query?.token), query),
        job: query => request<Redash.Job, GetJobParameter>({
            clientConfig: mergeToken(cc, query?.token),
            path: `/jobs${query.id}`,
            method: 'GET',
            query
        })
    }
}
