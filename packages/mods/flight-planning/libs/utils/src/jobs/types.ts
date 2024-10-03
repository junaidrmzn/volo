export type Status = { status: "finished" | "started" | "failed" };

export type JobStatus = {
    jobId: string;
    status: "finished" | "started" | "failed";
};

export type MasterJobStatus = {
    jobIds: JobStatus[];
};

export type JobFunction = {
    status?: "finished" | "started" | "failed";
    resourceUrl?: string;
    retryInterval?: number;
    error?: boolean;
};
