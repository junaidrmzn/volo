import { useQuery } from "@tanstack/react-query";
import type { UseGetAllRequirementsOptions } from "./useGetAllRequirements";
import { useGetAllRequirements } from "./useGetAllRequirements";

export type UseGetAllRequirementsQueryOptions = UseGetAllRequirementsOptions;

export const useGetAllRequirementsQuery = (options: UseGetAllRequirementsQueryOptions) => {
    const { getAllRequirementsWithResponseEnvelope } = useGetAllRequirements(options);
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["requirements"],
        queryFn: getAllRequirementsWithResponseEnvelope,
    });

    return { requirements: data?.data || [], isLoading, pagination: data?.pagination, ...rest };
};
