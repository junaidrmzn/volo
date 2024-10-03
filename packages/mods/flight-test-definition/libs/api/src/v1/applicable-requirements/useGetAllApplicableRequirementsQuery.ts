import { useQuery } from "@tanstack/react-query";
import { useGetAllApplicableRequirements } from "./useGetAllApplicableRequirements";

export type UseGetAllApplicableRequirementsQueryOptions = {
    definitionId: string;
    procedureId: string;
    params?: Record<string, string | number>;
};

export const getApplicableRequirementsQueryKey = () => ["applicableRequirements"];

export const useGetAllApplicableRequirementsQuery = (options: UseGetAllApplicableRequirementsQueryOptions) => {
    const { getAllApplicableRequirements } = useGetAllApplicableRequirements(options);

    const { data: applicableRequirements } = useQuery({
        queryKey: getApplicableRequirementsQueryKey(),
        queryFn: getAllApplicableRequirements,
    });

    return { applicableRequirements };
};
