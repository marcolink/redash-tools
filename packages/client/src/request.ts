import {BaseParameters, RedashResult, RequestClientConfig} from './types/common'

const querystring = require('querystring')
const fetch = require('node-fetch')

type RequestConfig<TQuery extends BaseParameters> = { path: string; method: string; query?: TQuery, body?: Record<string, any> }

export async function request<TQuery extends BaseParameters, TResult extends RedashResult, >(
    clientConfig: RequestClientConfig,
    config: RequestConfig<TQuery>
): Promise<TResult> {

    const queryPath = () => {
        if (!config.query) {
            return config.path
        }
        // return `${config.path}?${querystring.stringify({...config.query, corge: ''})}`
        return `${config.path}?${querystring.stringify(config.query)}`
    }

    const response = await fetch(`${clientConfig.host}/api${queryPath()}`, {
        method: config.method,
        body: config.body ? JSON.stringify(config.body) : undefined,
        headers: {'Content-Type': 'application/json', Authorization: clientConfig.token},
    })

    return await response.json() as TResult
}
