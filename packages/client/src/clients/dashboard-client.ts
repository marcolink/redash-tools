import {omit} from "lodash";
import {DashboardClient, DashboardOneParameters, GetManyParameters, Redash, RedashClientConfig} from "../types";
import {createRequest} from "./query-client";

const createGetOne = (clientConfig?: RedashClientConfig) => (params: DashboardOneParameters) => {
    return createRequest<DashboardOneParameters, Redash.Dashboard>({clientConfig, params})({
        path: `/dashboards/${params.slug}`,
        method: 'GET',
    })
}

const createGetMany = (clientConfig?: RedashClientConfig) => (params?: GetManyParameters) => {
    return createRequest<GetManyParameters, Redash.RedashCollectionResult<Redash.Dashboard>>(
        {clientConfig, params})({
        path: '/dashboards',
        method: 'GET',
        query: omit(params, ['token'])
    })
}

const createGetFavorites = (clientConfig?: RedashClientConfig) => (params?: GetManyParameters) => {
    return createRequest<GetManyParameters, Redash.RedashCollectionResult<Redash.Dashboard>>(
        {clientConfig, params})({
        path: '/dashboards/favorites',
        method: 'GET',
        query: omit(params, ['token'])
    })
}

export function dashboardClient(clientConfig?: RedashClientConfig): DashboardClient {
    return {
        getOne: createGetOne(clientConfig),
        getMany: createGetMany(clientConfig),
        getFavorites: createGetFavorites(clientConfig),
    }
}
