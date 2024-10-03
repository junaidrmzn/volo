import { useQuery } from "react-query";
import { useGetCsflSites } from "./useGetCsflSites";

type UseGetCsflSitesQueryOptions = {
    routeId: number | string;
    isEnabled?: boolean;
};

export const useGetCsflSitesQuery = (options: UseGetCsflSitesQueryOptions) => {
    const { routeId, isEnabled } = options;

    const { sendRequest } = useGetCsflSites({ routeId, manual: true });

    return useQuery({
        enabled: isEnabled,
        queryKey: ["routes", { routeId }, "csfl-sites"],
        queryFn: sendRequest,
    });
};
