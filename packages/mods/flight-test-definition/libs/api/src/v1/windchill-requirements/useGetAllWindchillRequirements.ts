import { useGetAllService } from "@voloiq/service";
import type { WindchillRequirement } from "./apiModels";

export type UseGetAllWindchillRequirementsOptions = {
    manual?: boolean;
    params?: {
        filter?: string;
        size?: number;
        page?: number;
    };
};

export const useGetAllWindchillRequirements = (options: UseGetAllWindchillRequirementsOptions = {}) => {
    const { manual = true, params = {} } = options;

    const {
        sendRequestWithResponseEnvelope: getAllWindchillRequirementsWithResponseEnvelope,
        sendRequest: getAllWindchillRequirements,
    } = useGetAllService<WindchillRequirement>({
        route: `/ftd/v1/windchill-requirements`,
        options: { manual },
        params: {
            orderBy: "createTime:asc",
            size: params.size ?? 50,
            page: params.page ?? 1,
            ...(params.filter?.length && params.filter?.length > 0 ? { filter: params?.filter } : undefined),
        },
    });

    return { getAllWindchillRequirements, getAllWindchillRequirementsWithResponseEnvelope };
};
