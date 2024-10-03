import { useGetAllService } from "@voloiq/service";
import type { AdditionalComment } from "./apiModels";

export type UseGetAllAdditionalCommentsOptions = {
    definitionId: string;
    procedureId: string;
    params?: Record<string, string | number>;
};

export const useGetAllAdditionalComments = (options: UseGetAllAdditionalCommentsOptions) => {
    const { definitionId, procedureId, params } = options;

    const { sendRequest: getAllAdditionalComments } = useGetAllService<AdditionalComment>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
        options: { manual: true },
        params: {
            orderBy: "createTime:asc",
            ...params,
        },
    });

    return { getAllAdditionalComments };
};
