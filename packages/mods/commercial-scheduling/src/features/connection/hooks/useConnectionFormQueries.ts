import {
    useGetAircraftTypesQuery,
    useGetRegionsQuery,
    useGetRouteOptionsQuery,
    useGetRoutesQuery,
    useGetVertiportsQuery,
} from "@voloiq/commercial-scheduling-api/v1";

type UseConnectionFormQueriesOptions = {
    regionId?: string;
    aircraftTypeId?: string;
    arrivalVertiportId?: string;
    departureVertiportId?: string;
    routeOptionId?: string;
};

export const useConnectionFormQueries = (options: UseConnectionFormQueriesOptions) => {
    const { regionId, aircraftTypeId, arrivalVertiportId, departureVertiportId, routeOptionId } = options;

    const { regions } = useGetRegionsQuery();
    const { aircraftTypes } = useGetAircraftTypesQuery();
    const { vertiports } = useGetVertiportsQuery({ regionId });
    const { routeOptions } = useGetRouteOptionsQuery({ aircraftTypeId, arrivalVertiportId, departureVertiportId });
    const { routes } = useGetRoutesQuery({ routeOptionId });

    return { regions, aircraftTypes, vertiports, routeOptions, routes };
};
