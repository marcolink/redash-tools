import {Redash} from "./redash";

export type RedashResult = any

export type ISODateString = string;//`${number}-${number}-${number}T${number}:${number}:${number}Z`

export type RedashClientConfig = {
    host?: string;
    token?: string;
}

export type RequestClientConfig = Required<RedashClientConfig>

export type BaseParameters = Pick<RedashClientConfig, 'token'>

export type PagedParameters = {
    page?: number;
    page_size?: number;
}

export type SearchParameters = { q?: string }

export type GetQueriesParameter = PagedParameters & SearchParameters & BaseParameters

export type GetQueryParameter = { id: string } & BaseParameters

export type GetJobParameter = { id: string } & BaseParameters

export type GetCachedResultParameter = { id: string } & BaseParameters

export type GetUpdatedResultParameter = { id: string, max_age: number, parameters?: any } & BaseParameters

export type SnapshotParameters = {
    queryId: string;
    visualizationId: string;
    path?: string;
    width?: number;
    height?: number;
} & BaseParameters

export type QueriesClient = {
    one: (config: GetQueryParameter) => Promise<Redash.Query>;
    many: (config?: GetQueriesParameter) => Promise<Redash.RedashCollectionResult<Redash.Query>>;
    job: (config: GetJobParameter) => Promise<Redash.Job>;
    cachedResult: (config: GetCachedResultParameter) => Promise<Redash.Result>;
    updatedResult: (config: GetUpdatedResultParameter) => Promise<Redash.Result>;
    snapshot: (config: SnapshotParameters) => Promise<string | Buffer | void>;
}

export type RedashClient = {
    query: QueriesClient;
}
