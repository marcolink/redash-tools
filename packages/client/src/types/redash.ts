import {ISODateString} from "./common";

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

    export type Job = {
        status: 1 | 2 | 3 | 4 | 5
        query_result_id?: string
    }

    export type RedashCollectionResult<TResult> = {
        count: number;
        page: number;
        page_size: number;
        results: TResult[];
    }
}
