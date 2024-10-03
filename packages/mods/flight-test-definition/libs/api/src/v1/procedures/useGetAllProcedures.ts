import { useGetAllService } from "@voloiq/service";
import type { ProcedureRead } from "./apiModels";

export type UseGetAllProceduresOptions = {
    definitionId: string;
    manual?: boolean;
    params?: Record<string, string | number>;
};

export const useGetAllProcedures = (options: UseGetAllProceduresOptions) => {
    const { definitionId, manual = true, params } = options;

    const {
        data,
        pagination,
        sendRequest: getAllProcedures,
        sendRequestWithResponseEnvelope: getAllProceduresWithResponseEnvelope,
        state,
    } = useGetAllService<ProcedureRead>({
        route: `/ftd/v1/definitions/${definitionId}/procedures`,
        options: { manual },
        params: {
            orderBy: "createTime:asc",
            ...params,
        },
    });

    return { data, pagination, getAllProcedures, getAllProceduresWithResponseEnvelope, state };
};
