import { useMemo } from "react";
import { useGetAllAircraftsQuery } from "./useGetAllAircraftsQuery";
import { useGetAllCrewMembersQuery } from "./useGetAllCrewMembersQuery";
import { useGetAllLocationsQuery } from "./useGetAllLocationsQuery";

export const useFiltersWithQuery = () => {
    const { crewMembers, isCrewMembersLoading } = useGetAllCrewMembersQuery();
    const { aircrafts, isAircraftLoading } = useGetAllAircraftsQuery();
    const { locations, isLocationsLoading } = useGetAllLocationsQuery();
    const isFilterLoading = useMemo(() => {
        if (isCrewMembersLoading || isAircraftLoading || isLocationsLoading) {
            return true;
        }
        return false;
    }, [isAircraftLoading, isCrewMembersLoading, isLocationsLoading]);
    return { crewMembers, aircrafts, locations, isFilterLoading };
};
