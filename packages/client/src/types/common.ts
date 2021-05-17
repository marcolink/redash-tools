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

export type GetQueriesParameters = PagedParameters & SearchParameters & BaseParameters

export type GetQueryParameters = { id: string } & BaseParameters

export type GetJobParameters = { id: string } & BaseParameters

export type GetCachedResultParameters = { id: string } & BaseParameters

export type GetUpdatedResultParameters = { id: string, max_age: number, parameters?: any } & BaseParameters

export type SnapshotParameters = {
    queryId: string;
    visualizationId: string;
    path?: string;
    width?: number;
    height?: number;
} & BaseParameters

export type QueriesClient = {
    one: (config: GetQueryParameters) => Promise<Redash.Query>;
    many: (config?: GetQueriesParameters) => Promise<Redash.RedashCollectionResult<Redash.Query>>;
    job: (config: GetJobParameters) => Promise<Redash.Job>;
    cachedResult: (config: GetCachedResultParameters) => Promise<Redash.Result>;
    updatedResult: (config: GetUpdatedResultParameters) => Promise<Redash.Result>;
    snapshot: (config: SnapshotParameters) => Promise<string | Buffer | void>;
}

export type RedashClient = {
    query: QueriesClient;
}
