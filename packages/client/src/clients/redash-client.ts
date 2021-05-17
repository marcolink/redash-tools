import {RedashClient, RedashClientConfig} from '../types/common'
import {queriesClient} from './queries-client'

export function client(clientConfig?: RedashClientConfig): RedashClient {
    return {
        query: queriesClient(clientConfig),
    }
}

/*
const c = client()
c.query.many().then(console.log)
c.query.one({id: 'queryId'}).then(console.log)
c.query.snapshot({queryId: '1', visualizationId: '2'}).then(console.log)
c.query.job({id: '1'}).then(console.log)
 */
