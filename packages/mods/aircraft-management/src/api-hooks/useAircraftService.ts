import { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import { Aircraft, AircraftCreate, AircraftUpdate, AircraftWithReservations } from "@voloiq/aircraft-management-api/v1";
import { SelectOption } from "@voloiq/filter-panel";
import { useCreateService, useGetAllService, useGetService, usePatchService, useUpdateService } from "@voloiq/service";
import { AIRCRAFT_MANAGEMENT } from "./serviceEndpoints";

const route = `${AIRCRAFT_MANAGEMENT}/aircraft`;

const routeFromVertiport = `${AIRCRAFT_MANAGEMENT}/vertiports`;

type VertiportApi = Vertiport & { services: string[] };

export const useGetAircraft = (aircraftId: string) => useGetService<Aircraft>({ route, resourceId: aircraftId });

export const useGetAircraftManual = () => useGetService<Aircraft>({ route, resourceId: "", options: { manual: true } });

export const useGetAllAircrafts = (
    pageNumber: number = 1,
    pageSize: number = 100,
    orderByParameter?: string,
    filterString?: string
) =>
    useGetAllService<Aircraft>({
        params: {
            page: pageNumber,
            size: pageSize,
            ...(orderByParameter && { orderBy: orderByParameter }),
            ...(filterString && { filter: filterString }),
        },
        route,
    });

export const useCreateAircraft = () => useCreateService<AircraftCreate, Aircraft>({ route });

export const useUpdateAircraft = () => useUpdateService<AircraftUpdate, Aircraft>({ route });

export const useGetAllAircraftEvents = () =>
    useGetAllService<AircraftWithReservations>({
        route: `${route}/reservations`,
        options: {
            autoCancel: false,
            manual: true,
        },
    });

export type VertiportOption = {
    id: string;
    name: string;
    code?: string;
};

const useRouteForVertiports = () => {
    return routeFromVertiport;
};

export const useGetAllVertiports = () => {
    const routeForVertiports = useRouteForVertiports();

    return useGetAllService<Vertiport>({
        route: routeForVertiports,
    });
};

const getVertiportLabel = (vertiport: Vertiport) => {
    const label = `${vertiport.code}${vertiport.icaoCode ? ` - ${vertiport.icaoCode}` : ""}`;
    return vertiport.name ? `${vertiport.name} (${label})` : label;
};

export const useGetAllVertiportOptions = () => {
    const { data: vertiports } = useGetAllVertiports();

    // vertiport must have at least one of these service capabilities
    const mustHaveService = ["PAX", "MXN", "BAT", "TEST"];

    const vertiportOptions = vertiports
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        .map((value) => value as VertiportApi)
        .filter(
            (vertiport: VertiportApi) =>
                vertiport.code &&
                vertiport.shortName &&
                mustHaveService.some((service) => vertiport?.services?.includes(service))
        )
        .map<SelectOption>((vertiport) => ({
            value: vertiport.id,
            label: getVertiportLabel(vertiport),
        }));

    return { vertiportOptions };
};
export const useDeleteAircraft = () => usePatchService({ route });
