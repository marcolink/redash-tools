import {
  DateRange,
  parseDynamicDate,
  parseDynamicDateRange,
} from './dynamic-date';
import { Redash, RedashClientConfig, RequestClientConfig } from './types';

import OptionParameters = Redash.OptionParameters;

export function ensureConfig(
  config?: RedashClientConfig,
  token?: string
): RequestClientConfig {
  let c = { ...config };

  if (token) {
    c.token = token;
  }

  if (!c.token) {
    throw new Error('no token provided');
  }

  return { host: 'https://redash.io', ...c } as RequestClientConfig;
}

type ParsedOptionParameters = Record<string, any>;

export function parseOptionParameters(
  parameters: OptionParameters[]
): ParsedOptionParameters {
  return parameters.reduce((result, parameters: OptionParameters) => {
    let value;

    switch (parameters.type) {
      case 'date':
        value = parseDynamicDate(parameters.value, 'YYYY-MM-DD');
        break;
      case 'datetime-local':
        value = parseDynamicDate(parameters.value, 'YYYY-MM-DD HH:mm');
        break;
      case 'datetime-with-seconds':
        value = parseDynamicDate(parameters.value, 'YYYY-MM-DD HH:mm:ss');
        break;
      case 'date-range':
        value = parseDynamicDateRange(
          parameters.value as string | DateRange,
          'YYYY-MM-DD'
        );
        break;
      case 'datetime-range':
        value = parseDynamicDateRange(
          parameters.value as string | DateRange,
          'YYYY-MM-DD HH:mm'
        );
        break;
      case 'datetime-range-with-seconds':
        value = parseDynamicDateRange(
          parameters.value as string | DateRange,
          'YYYY-MM-DD HH:mm:ss'
        );
        break;
      default:
        value = parameters.value;
        break;
    }
    result[parameters.name] = value;
    return result;
  }, {} as ParsedOptionParameters);
}
