import { JobFunction, Status } from "../types";

type JobStatusIntervalOptions = {
    jobFunction: () => Promise<JobFunction>;
    initialInterval: number;
    isExponentialBackoffEnabled?: boolean;
    maxRetries?: number;
    maxInterval?: number;
};

export const getJobStatusInterval = async (options: JobStatusIntervalOptions) => {
    const {
        jobFunction,
        initialInterval,
        isExponentialBackoffEnabled,
        maxRetries = 60,
        maxInterval = 1000 * 20,
    } = options;

    return new Promise<Status>((resolve, reject) => {
        const exponentialBackOff = async () => {
            let retriesLeft = maxRetries;
            const { status, error } = await jobFunction();

            if (status === "finished") {
                resolve({ status });
            } else if (retriesLeft <= 1 || error) {
                reject();
            } else {
                let currentInterval = initialInterval;
                if (isExponentialBackoffEnabled) {
                    if (currentInterval === maxInterval) currentInterval = initialInterval;
                    currentInterval = currentInterval * 2 > maxInterval ? maxInterval : currentInterval * 2;
                }
                retriesLeft--;
                setTimeout(exponentialBackOff, isExponentialBackoffEnabled ? currentInterval : initialInterval);
            }
        };

        exponentialBackOff();
    });
};
