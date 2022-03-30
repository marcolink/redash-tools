import { omit, merge, cloneDeep } from 'lodash';
import { request } from '../request';
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
  RequestConfig,
} from '../types';
import { ensureConfig, parseOptionParameters } from '../utils';
import { waitForJob } from '../waitForJob';

type PrepareRequestParams<TQuery extends BaseParameters> = {
  clientConfig?: RedashClientConfig;
  params?: TQuery;
};

export const createRequest = <
  TQuery extends BaseParameters,
  TResult extends RedashResult
>({
  params,
  clientConfig,
}: PrepareRequestParams<TQuery>) => {
  const requestClientConfig = ensureConfig(clientConfig, params?.token);
  return (config: RequestConfig<TQuery>) =>
    request<TQuery, TResult>(requestClientConfig, config);
};

const createGetOne = (clientConfig?: RedashClientConfig) => (
  params: GetOneParameters
) => {
  return createRequest<GetOneParameters, Redash.Query>({
    clientConfig,
    params,
  })({
    path: `/queries/${params.id}`,
  });
};

const createGetMany = (clientConfig?: RedashClientConfig) => (
  params?: GetManyParameters
) => {
  return createRequest<
    GetManyParameters,
    Redash.RedashCollectionResult<Redash.Query>
  >({ clientConfig, params })({
    path: '/queries',
    query: omit(params, ['token']),
  });
};

const createGetJob = (clientConfig?: RedashClientConfig) => (
  params: GetJobParameters
) => {
  return createRequest<GetJobParameters, Redash.Job>({ clientConfig, params })({
    path: `/jobs/${params.id}`,
  });
};

const createGetCachedResult = (clientConfig?: RedashClientConfig) => (
  params: GetCachedResultParameters
) => {
  return createRequest<GetCachedResultParameters, Redash.Result>({
    clientConfig,
    params,
  })({
    path: `/queries/${params.id}/results`,
  });
};

const createGetUpdatedResult = (clientConfig?: RedashClientConfig) => async (
  params: GetUpdatedResultParameters
) => {
  const cConfig = ensureConfig(clientConfig, params?.token);

  const queryData = await createGetOne(clientConfig)(params);

  let parameters = omit(cloneDeep(params.parameters), 'max_age');

  if (queryData.options?.parameters.length) {
    const params = parseOptionParameters(queryData.options?.parameters);
    parameters = merge(parameters, params);
  }

  const postQueriesResult = await request<
    Pick<GetUpdatedResultParameters, 'max_age'>,
    Redash.Result | Redash.Job
  >(cConfig, {
    path: `/queries/${params.id}/results`,
    method: 'POST',
    body: {
      parameters,
      max_age: params.max_age,
    },
  });

  if (postQueriesResult.hasOwnProperty('query_result')) {
    return postQueriesResult as Redash.Result;
  }

  const castedPostQueriesResult = postQueriesResult as Redash.Job;

  const jobResult = await waitForJob(cConfig, {
    jobId: castedPostQueriesResult.job.id,
  });

  return request<never, Redash.Result>(cConfig, {
    path: `/query_results/${jobResult.job.query_result_id}`,
  });
};

export function queryClient(clientConfig?: RedashClientConfig): QueryClient {
  return {
    getOne: createGetOne(clientConfig),
    getMany: createGetMany(clientConfig),
    getJob: createGetJob(clientConfig),
    getCachedResult: createGetCachedResult(clientConfig),
    getUpdatedResult: createGetUpdatedResult(clientConfig),
  };
}
