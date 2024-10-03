import { useQuery } from "@tanstack/react-query";
import type { UseGetSoftwareConfigurationOptions } from "./useGetSoftwareConfiguration";
import { useGetSoftwareConfiguration } from "./useGetSoftwareConfiguration";

export const getSoftwareConfigurationQueryKey = () => ["software-configurations"];

export const useGetSoftwareConfigurationQuery = (options: UseGetSoftwareConfigurationOptions) => {
    const { softwareConfigurationId } = options;
    const { getSoftwareConfiguration } = useGetSoftwareConfiguration({ softwareConfigurationId });

    const {
        data: softwareConfiguration,
        refetch: refetchSoftwareConfiguration,
        isLoading,
    } = useQuery({
        queryKey: getSoftwareConfigurationQueryKey(),
        queryFn: getSoftwareConfiguration,
    });

    return {
        softwareConfiguration,
        refetchSoftwareConfiguration,
        isLoading,
    };
};
