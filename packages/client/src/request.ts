import { RedashResult, RequestClientConfig, RequestConfig } from './types';

const querystring = require('querystring');
const fetch = require('node-fetch');

export async function request<TQuery, TResult extends RedashResult>(
  clientConfig: RequestClientConfig,
  config: RequestConfig<TQuery>
): Promise<TResult> {
  const queryPath = () => {
    if (!config.query) {
      return config.path;
    }
    const queryString: string = querystring.stringify(config.query);
    if (queryString && queryString.length) {
      return `${config.path}?${querystring.stringify(config.query)}`;
    }
    return config.path;
  };

  let requestConfig: {
    method: string;
    headers: Record<string, string>;
    body?: string;
  } = {
    method: config.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: clientConfig.token,
    },
  };

  if (config.body) {
    requestConfig.body = JSON.stringify(config.body);
  }

  const response = await fetch(
    `${clientConfig.host}/api${queryPath()}`,
    requestConfig
  );
  const result = await response.json();
  return result as TResult;
}
