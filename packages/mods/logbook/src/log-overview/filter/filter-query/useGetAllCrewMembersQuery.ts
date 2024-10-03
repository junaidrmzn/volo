import { useQuery } from "@tanstack/react-query";
import { useGetAllCrewMembers } from "@voloiq/logbook-api/v6";

export const useGetAllCrewMembersQuery = () => {
    const { getAllCrewMembers } = useGetAllCrewMembers({ serviceOptionsOverride: { options: { manual: true } } });

    const queryKey = ["crewMembers"];
    const crewMembersQuery = useQuery({
        queryKey,
        queryFn: getAllCrewMembers,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { crewMembers: crewMembersQuery.data?.data || [], isCrewMembersLoading: crewMembersQuery.isLoading };
};
