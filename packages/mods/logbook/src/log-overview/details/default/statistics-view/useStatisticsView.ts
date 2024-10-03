import type { LogbookFile } from "@voloiq/logbook-api/v6";

export const useStatisticsView = (files: LogbookFile[]) => {
    const hasPendingFiles =
        files.length === 0 || files.some((file) => ["QUEUED", "PROCESSING", "ERROR"].includes(file.status));

    return { hasPendingFiles };
};
