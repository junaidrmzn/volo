import { useQuery } from "@tanstack/react-query";
import { useGetVertiports } from "./useGetVertiports";

type UseGetVertiportsQueryOptions = {
    regionId?: string;
};

export const useGetVertiportsQuery = (options: UseGetVertiportsQueryOptions) => {
    const { regionId } = options;
    const { sendRequest } = useGetVertiports({ manual: true });

    const queryKey = ["vertiports", regionId];
    const queryFunction = () => {
        return sendRequest({
            params: {
                page: 1,
                size: 100,
                filter: `(regionId EQ ${regionId})`,
            },
        });
    };

    const vertiportQuery = useQuery({
        queryKey,
        queryFn: queryFunction,
        enabled: !!regionId,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { vertiports: vertiportQuery.data || [], isLoading: vertiportQuery.isLoading };
};
