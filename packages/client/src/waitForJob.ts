import {request} from "./request";
import {Redash, RequestClientConfig} from "./types";

async function waitFor<TResponse>(
    fn: () => Promise<TResponse>,
    validate: (value: TResponse) => boolean,
    timeout: number = 1000
): Promise<TResponse> {
    const result = await fn();
    if (!validate(result)) {
        await new Promise((resolve => {
            setTimeout(resolve, timeout)
        }));
        return waitFor(fn, validate, timeout)
    }
    return result;
}

export async function waitForJob(clientConfig: RequestClientConfig, config: { jobId: string }): Promise<Redash.Job> {
    return waitFor(
        () => request<{}, Redash.Job>(clientConfig, {path: `/jobs/${config.jobId}`}),
        (value => value.job.status >= 3),
        1000 * 10
    );
}
