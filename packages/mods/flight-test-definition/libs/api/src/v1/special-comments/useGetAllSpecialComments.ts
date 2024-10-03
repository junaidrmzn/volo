import { useGetAllService } from "@voloiq/service";
import type { SpecialComment } from "./apiModels";

export type UseGetAllSpecialCommentsOptions = {
    definitionId: string;
};

export const useGetAllSpecialComments = (options: UseGetAllSpecialCommentsOptions) => {
    const { definitionId } = options;

    const { sendRequest: getAllSpecialComments } = useGetAllService<SpecialComment>({
        route: `/ftd/v1/definitions/${definitionId}/special-comments`,
        options: { manual: true },
        params: {
            orderBy: "createTime:asc",
            size: 100_000,
        },
    });

    return { getAllSpecialComments };
};
