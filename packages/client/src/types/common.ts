import {Redash} from "./redash";

export type RedashResult = any

export type ISODateString = `${number}-${number}-${number}T${number}:${number}:${number}Z`

export type RedashClientConfig = {
    host: string;
    token?: string;
}

export type BaseParameters = { token?: string }

export type PagedParameters = {
    page?: number;
    page_size?: number;
}

export type SearchParameters = { q?: string }

export type GetQueriesParameter = PagedParameters & SearchParameters & BaseParameters

export type GetQueryParameter = { id: string } & BaseParameters

export type GetJobParameter = { id: string } & BaseParameters

export type SnapshotParameters = {
  queryId: string;
  visualizationId: string;
  path?: string;
  width?: number;
  height?: number;
} & BaseParameters

export type QueriesClient = {
    list: (config?: GetQueriesParameter) => Promise<Redash.RedashCollectionResult<Redash.Query>>;
    get: (config: GetQueryParameter) => Promise<Redash.Query>;
    snapshot: (config: SnapshotParameters) => Promise<string | Buffer | void>;
    job: (config: GetQueryParameter) => Promise<Redash.Job>;
}

export type RedashClient = {
    query: QueriesClient;
}
