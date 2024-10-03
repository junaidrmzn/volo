import { useQuery } from "@tanstack/react-query";
import { useGetServices } from "./useGetServices";

export const useGetServicesQuery = () => {
    const { sendRequest } = useGetServices({ manual: true });

    const queryKey = ["services"];
    const servicesQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { services: servicesQuery.data || [], isLoading: servicesQuery.isLoading };
};
