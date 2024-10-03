import { useQuery } from "@tanstack/react-query";
import { useGetAllDelayCodes } from "./useGetAllDelayCodes";

type useGetRouteOptionQueryOptions = {
    isEnabled: boolean;
};

export const useGetAllDelayCodesQuery = (options: useGetRouteOptionQueryOptions) => {
    const { isEnabled } = options;

    const { sendRequest } = useGetAllDelayCodes({ options: { manual: true } });

    return useQuery<Awaited<ReturnType<typeof sendRequest>>, Error>({
        enabled: isEnabled,
        queryKey: ["delay-codes"],
        queryFn: sendRequest,
        staleTime: 60_000,
    });
};
