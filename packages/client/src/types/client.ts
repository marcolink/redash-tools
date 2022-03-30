import { Redash } from './redash';

export type RedashResult = any;

export type ISODateString = string; //`${number}-${number}-${number}T${number}:${number}:${number}Z`

export type RedashClientConfig = {
  host?: string;
  token?: string;
};

export type RequestClientConfig = Required<RedashClientConfig>;

export type RequestConfig<TQuery> = {
  path: string;
  method?: string;
  query?: TQuery;
  body?: Record<string, any>;
};

export type BaseParameters = Pick<RedashClientConfig, 'token'>;

export type PagedParameters = {
  page?: number;
  page_size?: number;
};

export type SearchParameters = { q?: string };

export type GetManyParameters = PagedParameters &
  SearchParameters &
  BaseParameters;

export type GetOneParameters = { id: string } & BaseParameters;

/*
 * Query Client types
 */
export type GetJobParameters = { id: string } & BaseParameters;

export type GetCachedResultParameters = { id: string } & BaseParameters;

export type GetUpdatedResultParameters = {
  id: string;
  max_age: number;
  parameters?: any;
} & BaseParameters;

export type QueryClient = {
  getOne: (config: GetOneParameters) => Promise<Redash.Query>;
  getMany: (
    config?: GetManyParameters
  ) => Promise<Redash.RedashCollectionResult<Redash.Query>>;
  getJob: (config: GetJobParameters) => Promise<Redash.Job>;
  getCachedResult: (
    config: GetCachedResultParameters
  ) => Promise<Redash.Result>;
  getUpdatedResult: (
    config: GetUpdatedResultParameters
  ) => Promise<Redash.Result>;
};

/*
 * Dashboard Client types
 */
export type DashboardOneParameters = { slug: string } & BaseParameters;

export type DashboardClient = {
  getOne: (config: DashboardOneParameters) => Promise<Redash.Dashboard>;
  getMany: (
    config?: GetManyParameters
  ) => Promise<Redash.RedashCollectionResult<Redash.Dashboard>>;
  getFavorites: () => Promise<Redash.RedashCollectionResult<Redash.Dashboard>>;
};

/*
 * Redash Client types
 */
export type RedashClient = {
  query: QueryClient;
  dashboard: DashboardClient;
};
