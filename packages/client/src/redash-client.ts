import {RedashClient, RedashClientConfig} from './types'
import {queriesClient} from './queries-client'

export function client(clientConfig: RedashClientConfig): RedashClient {
  return {
    query: queriesClient(clientConfig),
  }
}
