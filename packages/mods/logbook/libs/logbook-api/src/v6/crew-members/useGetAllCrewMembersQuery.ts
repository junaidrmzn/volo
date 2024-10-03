import { useQuery } from "@tanstack/react-query";
import { useGetAllCrewMembers } from "./useGetAllCrewMembers";

export const getAllCrewMembersQueryKey = () => ["crew-members"];

export const useGetAllCrewMembersQuery = () => {
    const { getAllCrewMembers } = useGetAllCrewMembers();

    const {
        data,
        refetch: refetchAllCrewMembers,
        isLoading,
    } = useQuery({
        queryKey: getAllCrewMembersQueryKey(),
        queryFn: getAllCrewMembers,
    });

    return {
        crewMembers: data?.data,
        refetchAllCrewMembers,
        isLoading,
        pagination: data?.pagination,
    };
};
