import { useGetAllService } from "@voloiq/service";
import type { FTILink } from "./apiModels";

export type UseGetAllFtiLinksOptions = {
    definitionId: string;
    manual?: boolean;
    params?: Record<string, string | number>;
};

export const useGetAllFtiLinks = (options: UseGetAllFtiLinksOptions) => {
    const { definitionId, manual = true, params } = options;

    const {
        data,
        pagination,
        sendRequest: getAllFtiLinks,
        sendRequestWithResponseEnvelope: getAllFtiLinksWithResponseEnvelope,
    } = useGetAllService<FTILink>({
        route: `/ftd/v1/definitions/${definitionId}/instrumentation-parameters`,
        options: { manual },
        params,
    });

    return { data, pagination, getAllFtiLinks, getAllFtiLinksWithResponseEnvelope };
};
