import { useGetAllService } from "@voloiq/service";
import type { TestPoint } from "./apiModels";

export type UseGetAllTestPointsOptions = {
    definitionId: string;
    procedureId: string;
    params?: Record<string, string | number>;
};

export const useGetAllTestPoints = (options: UseGetAllTestPointsOptions) => {
    const { definitionId, procedureId, params } = options;

    const { sendRequest: getAllTestPoints } = useGetAllService<TestPoint>({
        route: `/ftd/v2/definitions/${definitionId}/procedures/${procedureId}/test-points`,
        options: { manual: true },
        params: {
            orderBy: "createTime:asc",
            ...params,
        },
    });

    return { getAllTestPoints };
};
