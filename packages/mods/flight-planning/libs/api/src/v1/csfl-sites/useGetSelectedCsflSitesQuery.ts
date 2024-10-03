import { useQuery } from "react-query";
import { useGetSelectedCsflSites } from "./useGetSelectedCsflSites";

type UseGetSelectedCsflSitesOptions = {
    routeId: string | number;
    isEnabled?: boolean;
};
export const useGetSelectedCsflSitesQuery = (options: UseGetSelectedCsflSitesOptions) => {
    const { routeId, isEnabled } = options;

    const { sendRequest } = useGetSelectedCsflSites({ routeId, manual: true });

    return useQuery({
        enabled: isEnabled,
        queryKey: ["routes", { routeId }, "selected-csfl-sites"],
        queryFn: sendRequest,
    });
};
