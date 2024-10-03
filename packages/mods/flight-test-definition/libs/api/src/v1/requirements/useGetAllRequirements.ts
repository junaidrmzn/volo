import { useGetAllService } from "@voloiq/service";
import type { Requirement } from "./apiModels";

export type UseGetAllRequirementsOptions = {
    definitionId: string;
    manual?: boolean;
    pagination?: {
        size?: number;
        page?: number;
    };
    params?: {
        filter?: string;
    };
};

export const useGetAllRequirements = (options: UseGetAllRequirementsOptions) => {
    const { definitionId, manual = true, pagination, params = {} } = options;

    const { sendRequestWithResponseEnvelope: getAllRequirementsWithResponseEnvelope, sendRequest: getAllRequirements } =
        useGetAllService<Requirement>({
            route: `/ftd/v1/definitions/${definitionId}/requirements`,
            options: { manual },
            params: {
                orderBy: "createTime:asc",
                size: pagination?.size || 50,
                page: pagination?.page || 1,
                ...(params.filter?.length && params.filter?.length > 0 ? { filter: params?.filter } : undefined),
            },
        });

    return { getAllRequirements, getAllRequirementsWithResponseEnvelope };
};
