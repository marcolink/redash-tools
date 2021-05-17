import {RedashClient, RedashClientConfig} from '../types'
import {dashboardClient} from "./dashboard-client";
import {queryClient} from './query-client'

export function client(clientConfig?: RedashClientConfig): RedashClient {
    return {
        query: queryClient(clientConfig),
        dashboard: dashboardClient(clientConfig)
    }
}
