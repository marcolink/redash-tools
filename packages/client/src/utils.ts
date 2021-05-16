import {RedashClientConfig} from "./types/common";

export function mergeToken(config: RedashClientConfig, token?: string) {
    if (!token) {
        return config;
    }
    return {...config, token}
}
