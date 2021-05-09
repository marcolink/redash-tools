export type RedashResult = any

export type ISODateString = `${number}-${number}-${number}T${number}:${number}:${number}Z`

export type User = {
    auth_type: string;
    is_disabled: boolean;
    updated_at: ISODateString;
    profile_image_url: string;
    is_invitation_pending: boolean;
    groups: number[];
    id: number;
    name: string;
    created_at: ISODateString;
    disabled_at: ISODateString | null;
    is_email_verified: boolean;
    active_at: ISODateString;
    email: string;
}

export type Query = {
    is_archived: boolean;
    retrieved_at: ISODateString;
    updated_at: ISODateString;
    is_favorite: boolean;
    query: string;
    id: number;
    description: string | null;
    last_modified_by_id: number;
    tags: string[];
    version: number;
    query_hash: string;
    api_key: string;
    data_source_id: number;
    is_safe: boolean;
    latest_query_data_id: number;
    schedule: null | any;
    user: User;
    is_draft: boolean;
    name: string;
    created_at: ISODateString;
    runtime: number;
    options: {
        parameters: any[];
    };
}

export type RedashCollectionResult<TResult> = {
    count: number;
    page: number;
    page_size: number;
    results: TResult[];
}

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

export type SnapshotParameters = {
  queryId: string;
  visualizationId: string;
  path?: string;
  width?: number;
  height?: number;
} & BaseParameters

export type QueriesClient = {
    list: (config?: GetQueriesParameter) => Promise<RedashCollectionResult<Query>>;
    get: (config: GetQueryParameter) => Promise<Query>;
    snapshot: (config: SnapshotParameters) => Promise<string | Buffer | void>;
}

export type RedashClient = {
    query: QueriesClient;
}
