import {omit} from 'lodash'
import {request, RequestConfig} from '../request'
import {snapshot} from '../snapshot'
import {
    BaseParameters,
    GetCachedResultParameters,
    GetJobParameters,
    GetUpdatedResultParameters,
    ManyParameters,
    OneParameters,
    QueryClient,
    Redash,
    RedashClientConfig,
    RedashResult,
    SnapshotParameters,
} from '../types'
import {ensureConfig} from "../utils";
import {waitForJob} from "../waitForJob";

type PrepareRequestParams<TQuery extends BaseParameters> = {
    clientConfig?: RedashClientConfig, params?: TQuery
}

export const prepareRequest = <TQuery extends BaseParameters, TResult extends RedashResult>(
    {
        params,
        clientConfig
    }: PrepareRequestParams<TQuery>) => {
    const requestClientConfig = ensureConfig(clientConfig, params?.token);
    return (config: RequestConfig<TQuery>) => request<TQuery, TResult>(requestClientConfig, config)
}

const createOne = (clientConfig?: RedashClientConfig) => (params: OneParameters) => {
    return prepareRequest<OneParameters, Redash.Query>({clientConfig, params})({
        path: `/queries/${params.id}`,
        method: 'GET',
    })
}

const createMany = (clientConfig?: RedashClientConfig) => (params?: ManyParameters) => {
    return prepareRequest<ManyParameters, Redash.RedashCollectionResult<Redash.Query>>(
        {clientConfig, params})({
        path: '/queries',
        method: 'GET',
        query: omit(params, ['token'])
    })
}

const createJob = (clientConfig?: RedashClientConfig) => (params: GetJobParameters) => {
    return prepareRequest<GetJobParameters, Redash.Job>(
        {clientConfig, params})(
        {
            path: `/jobs/${params.id}`,
            method: 'GET',
        }
    )
}

const createCachedResult = (clientConfig?: RedashClientConfig) => (params: GetCachedResultParameters) => {
    return prepareRequest<GetCachedResultParameters, Redash.Result>({clientConfig, params})({
        path: `/queries/${params.id}/results`,
        method: 'GET'
    })
}

const createUpdatedResult = (clientConfig?: RedashClientConfig) => async (params: GetUpdatedResultParameters) => {
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

    return request<never, Redash.Result>(cConfig, {
        path: `/query_results/${jobResult.job.query_result_id}`,
        method: 'GET'
    })
}

const createSnapshot = (clientConfig?: RedashClientConfig) => (params: SnapshotParameters) => {
    return snapshot(ensureConfig(clientConfig, params?.token), params)
}

export function queryClient(clientConfig?: RedashClientConfig): QueryClient {
    return {
        one: createOne(clientConfig),
        many: createMany(clientConfig),
        job: createJob(clientConfig),
        cachedResult: createCachedResult(clientConfig),
        updatedResult: createUpdatedResult(clientConfig),
        snapshot: createSnapshot(clientConfig),
    }
}
