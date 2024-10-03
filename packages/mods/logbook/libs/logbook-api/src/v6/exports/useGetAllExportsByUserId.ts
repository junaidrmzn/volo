import { useGetAllService } from "@voloiq/service";
import type { ServiceOptions } from "@voloiq/service";
import type { Export } from "./apiModels";

export type UseGetAllExportsOptions = {
    logId: string;
    userId?: string;
    serviceOptionsOverride?: Partial<Pick<ServiceOptions, "options" | "params">>;
};
export const useGetAllExportsByUserId = (options: UseGetAllExportsOptions) => {
    const { logId, userId, serviceOptionsOverride } = options;
    const {
        data: exports,
        sendRequestWithResponseEnvelope: getAllExports,
        error,
        state,
    } = useGetAllService<Export>({
        route: `/logs/${logId}/exports`,
        params: {
            limit: 100,
            orderBy: "createTime:asc",
            filter: `fileType IN "CSV", "HDF5", "PARQUET"${userId ? ` AND createdBy EQ  "${userId}"` : ""}`,
            ...serviceOptionsOverride?.params,
        },
        options: serviceOptionsOverride?.options,
    });

    return {
        exports,
        getAllExports,
        error,
        state,
    };
};
