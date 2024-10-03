import { useCreateService } from "@voloiq/service";
import type { Log, LogInsert } from "./apiModels";

export const useAddLog = () => {
    const {
        data: log,
        sendRequest: addLog,
        statusCode,
        error,
        state,
    } = useCreateService<LogInsert, Log>({ route: "/logs" });
    return { log, addLog, statusCode, error, state };
};
