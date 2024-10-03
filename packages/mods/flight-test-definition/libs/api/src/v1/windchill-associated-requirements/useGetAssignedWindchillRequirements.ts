import { useGetAllService } from "@voloiq/service";
import type { WindchillRequirement } from "../windchill-requirements/apiModels";

export type UseGetAssignedWindchillRequirementsOptions = {
    definitionId: string;
    manual?: boolean;
    params?: {
        filter?: string;
        size?: number;
        page?: number;
    };
};

export const useGetAssignedWindchillRequirements = (options: UseGetAssignedWindchillRequirementsOptions) => {
    const { definitionId, manual = true, params = {} } = options;

    const {
        sendRequestWithResponseEnvelope: getAssignedWindchillRequirementsWithResponseEnvelope,
        sendRequest: getAssignedWindchillRequirements,
    } = useGetAllService<WindchillRequirement>({
        route: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
        options: { manual },
        params: {
            orderBy: "createTime:asc",
            size: params?.size || 50,
            page: params?.page || 1,
            ...(params.filter?.length && params.filter?.length > 0 ? { filter: params?.filter } : undefined),
        },
    });

    return { getAssignedWindchillRequirements, getAssignedWindchillRequirementsWithResponseEnvelope };
};
