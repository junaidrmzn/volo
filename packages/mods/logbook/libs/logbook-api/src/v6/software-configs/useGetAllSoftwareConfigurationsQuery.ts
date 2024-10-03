import { useQuery } from "@tanstack/react-query";
import type { UseGetAllSoftwareConfigurationsOptions } from "./useGetAllSoftwareConfigurations";
import { useGetAllSoftwareConfigurations } from "./useGetAllSoftwareConfigurations";

export const getAllSoftwareConfigurationsQueryKey = () => ["software-configurations"];

export const useGetAllSoftwareConfigurationsQuery = (options?: UseGetAllSoftwareConfigurationsOptions) => {
    const { getAllSoftwareConfigurations } = useGetAllSoftwareConfigurations(options);

    const {
        data: softwareConfigurations,
        refetch: refetchAllSoftwareConfigurations,
        isLoading,
    } = useQuery({
        queryKey: getAllSoftwareConfigurationsQueryKey(),
        queryFn: getAllSoftwareConfigurations,
    });

    return {
        softwareConfigurations,
        refetchAllSoftwareConfigurations,
        isLoading,
    };
};
