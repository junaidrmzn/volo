import { useQuery } from "@tanstack/react-query";
import type { UseGetAssignedWindchillRequirementsOptions } from "./useGetAssignedWindchillRequirements";
import { useGetAssignedWindchillRequirements } from "./useGetAssignedWindchillRequirements";

export const getAssignedWindchillRequirementsQueryKey = () => ["windchill-associated-requirements"];

export type UseGetAssignedWindchillRequirementsQueryOptions = UseGetAssignedWindchillRequirementsOptions;

export const useGetAssignedWindchillRequirementsQuery = (options: UseGetAssignedWindchillRequirementsQueryOptions) => {
    const { params } = options;
    const { getAssignedWindchillRequirementsWithResponseEnvelope } = useGetAssignedWindchillRequirements(options);

    const { data, ...rest } = useQuery(
        getAssignedWindchillRequirementsQueryKey(),
        () => getAssignedWindchillRequirementsWithResponseEnvelope({ params }),
        {
            staleTime: 100_000,
        }
    );

    return { assignedWindchillRequirements: data?.data || [], pagination: data?.pagination, ...rest };
};
