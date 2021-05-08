import {BaseParameters, RedashClientConfig, RedashResult} from './types'

const querystring = require('querystring')
const fetch = require('node-fetch')

type RequestConfig<TQuery extends BaseParameters> = { clientConfig: RedashClientConfig; path: string; method: string; query?: TQuery }

export async function request<TResult extends RedashResult, TQuery extends BaseParameters>(config: RequestConfig<TQuery>): Promise<TResult> {
  const queryPath = () => {
    if (!config.query) {
      return config.path
    }
    //    return `${config.path}?${querystring.stringify({...config.query, corge: ''})}`
    return `${config.path}?${querystring.stringify(config.query)}`
  }
  const response = await fetch(`${config.clientConfig.host}/api${queryPath()}`, {
    method: config.method,
    headers: {'Content-Type': 'application/json', Authorization: config.query?.token || config.clientConfig.token},
  })

  const data = await response.json() as TResult
  return data
}
