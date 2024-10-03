type Job = { jobId: string; status: "queued" | "started" | "finished" };

export const anyJob = (overrides?: Partial<Job>): Job => ({
    jobId: "d5f8df51-4b1f-4527-bfc5-44099578e604",
    status: "queued",
    ...overrides,
});
