import { useState } from "react";
import type { Log } from "@voloiq/logbook-api/v6";

export const useLogDetails = () => {
    const [exportRequestLog, setExportRequestLog] = useState<Log | undefined>(undefined);

    return {
        exportRequestLog,
        setExportRequestLog,
    };
};
