import { useQuery } from "@tanstack/react-query";
import { useOverviewFilter } from "../useOverviewFilter";

export const useGetWorkGroupsQuery = () => {
    const { getAllWorkgroups } = useOverviewFilter();

    const queryKey = ["workGroups"];
    const workGroupsQuery = useQuery({
        queryKey,
        queryFn: getAllWorkgroups,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { workGroups: workGroupsQuery.data || [], isWorkGroupsLoading: workGroupsQuery.isLoading };
};
