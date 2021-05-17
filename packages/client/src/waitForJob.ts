import {request} from "./request";
import {RequestClientConfig} from "./types/common";
import {Redash} from "./types/redash";

async function waitFor<TPayload>(
    fn: () => Promise<TPayload>,
    validate: (value: TPayload) => boolean,
    timeout: number = 1000
): Promise<TPayload> {
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
        () => request<{}, Redash.Job>(clientConfig, {method: 'GET', path: `/jobs/${config.jobId}`}),
        (value => value.job.status >= 3)
    );
}
