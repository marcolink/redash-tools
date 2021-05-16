import {RedashClient, RedashClientConfig} from '../types/common'
import {queriesClient} from './queries-client'

export function client(clientConfig: RedashClientConfig): RedashClient {
  return {
    query: queriesClient(clientConfig),
  }
}
