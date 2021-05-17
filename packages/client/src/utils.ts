import {RedashClientConfig, RequestClientConfig} from "./types";

export function ensureConfig(config?: RedashClientConfig, token?: string): RequestClientConfig | never {
    let c = {...config}

    if (token) {
        c.token = token;
    }

    if (!c.token) {
        throw new Error('no token provided')
    }

    return {host: 'https://redash.io', ...c} as RequestClientConfig
}
