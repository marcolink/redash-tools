import {request} from '../request'
import {snapshot} from '../snapshot'
import {
    GetCachedResultParameter,
    GetJobParameter,
    GetQueriesParameter,
    GetQueryParameter, GetUpdatedResultParameter,
    QueriesClient,
    RedashClientConfig, SnapshotParameters,
} from '../types/common'
import {Redash} from "../types/redash";
import {ensureConfig} from "../utils";
import {waitForJob} from "../waitForJob";
import {omit} from 'lodash'

const createOne = (clientConfig?: RedashClientConfig) => (params: GetQueryParameter) => {
    return request<GetQueryParameter, Redash.Query>(
        ensureConfig(clientConfig, params?.token), {
            path: `/queries/${params.id}`,
            method: 'GET',
        })
}

const createMany = (clientConfig?: RedashClientConfig) => (params?: GetQueriesParameter) => {
    return request<GetQueriesParameter, Redash.RedashCollectionResult<Redash.Query>>(
        ensureConfig(clientConfig, params?.token), {
            path: '/queries',
            method: 'GET',
            query: omit(params, ['token'])
        })
}

const createJob = (clientConfig?: RedashClientConfig) => (params: GetJobParameter) => {
    return request<GetJobParameter, Redash.Job>(
        ensureConfig(clientConfig, params?.token),
        {
            path: `/jobs/${params.id}`,
            method: 'GET',
        }
    )
}

const createCachedResult = (clientConfig?: RedashClientConfig) => (params: GetCachedResultParameter) => {
    return request<GetCachedResultParameter, Redash.Result>(ensureConfig(clientConfig, params?.token), {
        path: `/queries/${params.id}/results`,
        method: 'GET'
    })
}

const createUpdatedResult = (clientConfig?: RedashClientConfig) => async (params: GetUpdatedResultParameter) => {
    const cConfig = ensureConfig(clientConfig, params?.token);
    const postQueriesResult = await request<Pick<GetUpdatedResultParameter, 'max_age'>, Redash.Result | Redash.Job>(
        cConfig, {
            path: `/queries/${params.id}/results`,
            method: 'POST',
            query: {max_age: params.max_age},
            body: params.parameters ? {parameters: params.parameters} : undefined
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
}

const createSnapshot = (clientConfig?: RedashClientConfig) => (params: SnapshotParameters) => {
    return snapshot(ensureConfig(clientConfig, params?.token), params)
}

export function queriesClient(clientConfig?: RedashClientConfig): QueriesClient {
    return {
        one: createOne(clientConfig),
        many: createMany(clientConfig),
        job: createJob(clientConfig),
        cachedResult: createCachedResult(clientConfig),
        updatedResult: createUpdatedResult(clientConfig),
        snapshot: createSnapshot(clientConfig),
    }
}
