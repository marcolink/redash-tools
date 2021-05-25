import {omit} from 'lodash'
import {request} from '../request'
import {snapshot} from '../snapshot'
import {
    BaseParameters,
    GetCachedResultParameters,
    GetJobParameters,
    GetUpdatedResultParameters,
    GetManyParameters,
    GetOneParameters,
    QueryClient,
    Redash,
    RedashClientConfig,
    RedashResult,
    GetSnapshotParameters, RequestConfig,
} from '../types'
import {ensureConfig} from "../utils";
import {waitForJob} from "../waitForJob";

type PrepareRequestParams<TQuery extends BaseParameters> = {
    clientConfig?: RedashClientConfig, params?: TQuery
}

export const createRequest = <TQuery extends BaseParameters, TResult extends RedashResult>(
    {
        params,
        clientConfig
    }: PrepareRequestParams<TQuery>) => {
    const requestClientConfig = ensureConfig(clientConfig, params?.token);
    return (config: RequestConfig<TQuery>) => request<TQuery, TResult>(requestClientConfig, config)
}

const createGetOne = (clientConfig?: RedashClientConfig) => (params: GetOneParameters) => {
    return createRequest<GetOneParameters, Redash.Query>({clientConfig, params})({
        path: `/queries/${params.id}`,
    })
}

const createGetMany = (clientConfig?: RedashClientConfig) => (params?: GetManyParameters) => {
    return createRequest<GetManyParameters, Redash.RedashCollectionResult<Redash.Query>>(
        {clientConfig, params})({
        path: '/queries',
        query: omit(params, ['token'])
    })
}

const createGetJob = (clientConfig?: RedashClientConfig) => (params: GetJobParameters) => {
    return createRequest<GetJobParameters, Redash.Job>(
        {clientConfig, params})({
        path: `/jobs/${params.id}`,
    })
}

const createGetCachedResult = (clientConfig?: RedashClientConfig) => (params: GetCachedResultParameters) => {
    return createRequest<GetCachedResultParameters, Redash.Result>({clientConfig, params})({
        path: `/queries/${params.id}/results`,
    })
}

const createGetUpdatedResult = (clientConfig?: RedashClientConfig) => async (params: GetUpdatedResultParameters) => {
    const cConfig = ensureConfig(clientConfig, params?.token);
    const postQueriesResult = await request<Pick<GetUpdatedResultParameters, 'max_age'>, Redash.Result | Redash.Job>(
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

    return request<never, Redash.Result>(cConfig, {path: `/query_results/${jobResult.job.query_result_id}`,})
}

const createGetSnapshot = (clientConfig?: RedashClientConfig) => (params: GetSnapshotParameters) => {
    return snapshot(ensureConfig(clientConfig, params?.token), params)
}

export function queryClient(clientConfig?: RedashClientConfig): QueryClient {
    return {
        getOne: createGetOne(clientConfig),
        getMany: createGetMany(clientConfig),
        getJob: createGetJob(clientConfig),
        getCachedResult: createGetCachedResult(clientConfig),
        getUpdatedResult: createGetUpdatedResult(clientConfig),
        getSnapshot: createGetSnapshot(clientConfig),
    }
}
