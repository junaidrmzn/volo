import { useQuery } from "@tanstack/react-query";
import { useGetCrewRoles } from "./useGetCrewRoles";

export const useGetCrewRolesQuery = () => {
    const { sendRequest } = useGetCrewRoles({ manual: true });

    const queryKey = ["crew-roles"];
    const crewRolesQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { crewRoles: crewRolesQuery.data || [], isLoading: crewRolesQuery.isLoading };
};
