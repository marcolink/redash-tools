import {request} from '../request'
import {snapshot} from '../snapshot'
import {
    GetJobParameter,
    GetQueriesParameter,
    GetQueryParameter, GetUpdatedResultParameter,
    QueriesClient,
    RedashClientConfig,
} from '../types/common'
import {Redash} from "../types/redash";
import {ensureConfig} from "../utils";
import {waitForJob} from "../waitForJob";
import {omit} from 'lodash'

export function queriesClient(clientConfig?: RedashClientConfig): QueriesClient {
    return {
        one: query => request<GetQueryParameter, Redash.Query>(
            ensureConfig(clientConfig, query?.token), {
                path: `/queries/${query.id}`,
                method: 'GET',
            }),
        many: query => request<GetQueriesParameter, Redash.RedashCollectionResult<Redash.Query>>(
            ensureConfig(clientConfig, query?.token), {
                path: '/queries',
                method: 'GET',
                query: omit(query, ['token'])
            }),
        job: query => request<GetJobParameter, Redash.Job>(
            ensureConfig(clientConfig, query?.token),
            {
                path: `/jobs/${query.id}`,
                method: 'GET',
            }
        ),
        cachedResult: query => request(ensureConfig(clientConfig, query?.token), {
            path: `/queries/${query.id}/results`,
            method: 'GET'
        }),
        updatedResult: async query => {
            const cConfig = ensureConfig(clientConfig, query?.token);
            const postQueriesResult = await request<Pick<GetUpdatedResultParameter, 'max_age'>, Redash.Result | Redash.Job>(
                cConfig, {
                    path: `/queries/${query.id}/results`,
                    method: 'POST',
                    query: {max_age: query.max_age},
                    body: query.parameters ? {parameters: query.parameters} : undefined
                })

            if (postQueriesResult.hasOwnProperty('query_result')) {
                return postQueriesResult as Redash.Result;
            }

            const castedPostQueriesResult = postQueriesResult as Redash.Job;

            const jobResult = await waitForJob(cConfig, {jobId: castedPostQueriesResult.job.id})

            return request<never, Redash.Result>(cConfig, {
                path: `/query_results/${jobResult.job.query_result_id}`,
                method: 'GET'
            })
        },
        snapshot: query => snapshot(ensureConfig(clientConfig, query?.token), query),
    }
}
