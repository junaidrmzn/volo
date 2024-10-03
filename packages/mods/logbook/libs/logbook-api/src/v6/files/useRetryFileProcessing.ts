import { useUpdateService } from "@voloiq/service";
import type { LogbookFile } from "./apiModels";

export type UseRetryFileProcessingOptions = {
    logId: string;
    fileId: string;
};

export const useRetryFileProcessing = (options: UseRetryFileProcessingOptions) => {
    const { logId, fileId } = options;
    const {
        sendRequest: retryFileProcessing,
        error,
        state,
    } = useUpdateService<never, LogbookFile>({
        route: `/logs/${logId}/files/${fileId}/retry`,
    });

    return {
        retryFileProcessing,
        error,
        state,
    };
};
