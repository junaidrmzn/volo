import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { LoggingInfo } from "../context/ServiceContext";

export type UseUpdateServiceOptions = LoggingInfo | undefined;

export const useTraceId = (options: UseUpdateServiceOptions) => {
    const { serviceName = "MISSING", teamName = "MISSING" } = options ?? {};
    const traceId = useMemo(() => `VoloIQ-${teamName}-${serviceName}-${uuidv4()}`, [teamName, serviceName]);
    return { traceId };
};
