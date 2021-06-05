import {ISODateString} from "./client";

export namespace Redash {

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

    /*
    1 == PENDING (waiting to be executed)
    2 == STARTED (executing)
    3 == SUCCESS
    4 == FAILURE
    5 == CANCELLED
    */
    export type JobStatus = 1 | 2 | 3 | 4 | 5

    export type Job = {
        job: {
            status: JobStatus,
            error?: string,
            id: string,
            query_result_id?: number,
            updated_at: ISODateString
        }
    }

    type ResultColumn = {
        friendly_name: string,
        type: string,
        name: string
    }

    export type Result<TRow = Record<string, any>> = {
        query_result: {
            retrieved_at: ISODateString,
            query_hash: string,
            query: string,
            runtime: number,
            data: {
                rows: TRow[],
                columns: ResultColumn[]
            },
            id: number,
            data_source_id: number,
            visualizations: Visualization[],
            options: QueryOptions
        }
    }

    export type RedashCollectionResult<TResult> = {
        count: number;
        page: number;
        page_size: number;
        results: TResult[];
    }

    // https://github.com/getredash/redash/tree/master/viz-lib#available-types
    export type VisualizationType =
        'CHART'
        | 'COHORT'
        | 'DETAILS'
        | 'FUNNEL'
        | 'CHOROPLETH'
        | 'MAP'
        | 'PIVOT'
        | 'SANKEY'
        | 'SUNBURST_SEQUENCE'
        | 'TABLE'
        | 'WORD_CLOUD'

    export type DynamicDate =
        'd_yesterday'
        | 'd_week'
        | 'd_month'
        | 'd_last_7_days'
        | 'd_last_14_days'
        | 'd_last_30_days'
        | 'd_last_60_days'
        | 'd_last_90_days'
        | 'd_last_week'
        | 'd_last_month'
        | 'd_last_year'
        | 'd_this_week'
        | 'd_this_month'
        | 'd_this_year'

    export type  ParameterType =
        "query"
        | 'enum'
        | 'text'
        | 'date'
        | 'datetime-local'
        | 'datetime-with-seconds'
        | 'date-range'
        | 'datetime-range'
        | 'datetime-range-with-seconds'

    export type OptionParameters = {
        name: string,
        title: string,
        global: boolean,
        value: DynamicDate | string | string[],
        "queryId": number,
        "parentQueryId": number,
        "type": ParameterType,
        "locals": []
    }

    export type QueryOptions = {
        parameters: OptionParameters[]
    }

    export type Visualization = {
        "description": string,
        "created_at": ISODateString,
        "updated_at": ISODateString,
        "id": number,
        "query": {
            "user": User,
            "created_at": ISODateString,
            "latest_query_data_id": number,
            "schedule": {
                "interval": number,
                "until": null,
                "day_of_week": null,
                "time": "23:15"
            },
            "description": null,
            "tags": [],
            "updated_at": ISODateString,
            "last_modified_by": User,
            "options": {
                "parameters": []
            },
            "is_safe": boolean,
            "version": number,
            "query_hash": string,
            "is_archived": boolean,
            "query": string,
            "api_key": string,
            "is_draft": boolean,
            "id": number,
            "data_source_id": number,
            "name": string
        },
        "type": VisualizationType,
        "options": any,
        "name": string
    }

    export type DashboardWidget = {
        visualization?: Visualization,
        "text": string,
        "created_at": ISODateString,
        "updated_at": ISODateString,
        "options": {
            "parameterMappings": any,
            "isHidden": boolean,
            "position": {
                "autoHeight": boolean,
                "sizeX": number,
                "sizeY": number,
                "maxSizeY": number,
                "maxSizeX": number,
                "minSizeY": number,
                "minSizeX": number,
                "col": number,
                "row": number
            }
        },
        "dashboard_id": number,
        "width": number,
        "id": number
    }


    export type Dashboard = {
        id: number,
        slug: string,
        name: string,
        tags: string[],
        version: number,
        is_draft: boolean,
        is_archived: boolean,
        is_favorite: boolean,
        user_id: number,
        user: User,
        layout: any[],
        updated_at: ISODateString,
        created_at: ISODateString,
        widgets: DashboardWidget[],
        dashboard_filters_enabled: boolean
    }
}
