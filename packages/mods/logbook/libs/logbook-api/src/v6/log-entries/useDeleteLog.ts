import { useDeleteService } from "@voloiq/service";

export const useDeleteLog = () => {
    const {
        sendRequest: deleteLog,
        sendRequestById: deleteLogById,
        error,
        state,
    } = useDeleteService({ route: "/logs" });
    return { deleteLog, deleteLogById, error, state };
};
