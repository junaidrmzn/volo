import { useGetAircraftsQuery } from "@voloiq/network-scheduling-management-api/v1";

export const useAircraft = () => {
    const { aircrafts, isLoading, error } = useGetAircraftsQuery();

    return { aircrafts, isLoading, error };
};
