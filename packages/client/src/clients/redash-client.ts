import {RedashClient, RedashClientConfig} from '../types'
import {dashboardClient} from "./dashboard-client";
import {queryClient} from './query-client'

export function client(clientConfig?: RedashClientConfig): RedashClient {
    return {
        query: queryClient(clientConfig),
        dashboard: dashboardClient(clientConfig)
    }
}

/*
const c = client()
c.query.many().then(console.log)
c.query.one({id: 'queryId'}).then(console.log)
c.query.snapshot({queryId: '1', visualizationId: '2'}).then(console.log)
c.query.job({id: '1'}).then(console.log)
c.dashboard.one({id: ''}).then(console.log)
c.dashboard.many().then(console.log)
 */
