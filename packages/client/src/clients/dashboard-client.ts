import {omit} from "lodash";
import {DashboardClient, DashboardOneParameters, ManyParameters, Redash, RedashClientConfig} from "redash-js-client";
import {prepareRequest} from "./query-client";

const createOne = (clientConfig?: RedashClientConfig) => (params: DashboardOneParameters) => {
    return prepareRequest<DashboardOneParameters, Redash.Dashboard>({clientConfig, params})({
        path: `/dashboards/${params.slug}`,
        method: 'GET',
    })
}

const createMany = (clientConfig?: RedashClientConfig) => (params?: ManyParameters) => {
    return prepareRequest<ManyParameters, Redash.RedashCollectionResult<Redash.Dashboard>>(
        {clientConfig, params})({
        path: '/dashboards',
        method: 'GET',
        query: omit(params, ['token'])
    })
}

const createFavorites = (clientConfig?: RedashClientConfig) => (params?: ManyParameters) => {
    return prepareRequest<ManyParameters, Redash.RedashCollectionResult<Redash.Dashboard>>(
        {clientConfig, params})({
        path: '/dashboards/favorites',
        method: 'GET',
        query: omit(params, ['token'])
    })
}

export function dashboardClient(clientConfig?: RedashClientConfig): DashboardClient {
    return {
        one: createOne(clientConfig),
        many: createMany(clientConfig),
        favorites: createFavorites(clientConfig),
    }
}
