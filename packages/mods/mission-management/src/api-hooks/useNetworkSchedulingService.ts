import { Aircraft, AircraftType } from "@voloiq-typescript-api/aircraft-management-types/dist";
import { CrewMemberWithReservations, CrewRole } from "@voloiq-typescript-api/crew-api-types";
import { RouteOption } from "@voloiq-typescript-api/network-scheduling-types";
import { Region, Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import { useGetAllService, useGetService } from "@voloiq/service";
import { availabilityFilters } from "../missions/mission-list-item/mission-actions-popover/availabilityFilters";
import { NETWORK_SCHEDULING_MANAGEMENT } from "./serviceEndpoints";

const vertiportRoute = `${NETWORK_SCHEDULING_MANAGEMENT}/vertiports`;
const regionsRoute = `${NETWORK_SCHEDULING_MANAGEMENT}/regions`;
const routeOptionRoute = `${NETWORK_SCHEDULING_MANAGEMENT}/route-options`;
const routeCrewRoles = `${NETWORK_SCHEDULING_MANAGEMENT}/crew-roles`;
const routeCrewMembers = `${NETWORK_SCHEDULING_MANAGEMENT}/crew-members`;

export const useGetVertiport = (id: string) => useGetService<Vertiport>({ route: vertiportRoute, resourceId: id });

export const useGetAllVertiports = () =>
    useGetAllService<Vertiport>({
        route: vertiportRoute,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
    });

export const useGetAllRegions = () =>
    useGetAllService<Region>({
        route: regionsRoute,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
    });

export const useGetRouteOption = (routeOptionId: string) =>
    useGetService<RouteOption>({
        route: routeOptionRoute,
        resourceId: routeOptionId,
        options: {
            manual: true,
        },
    });

export const useGetAllCrewRoles = () =>
    useGetAllService<CrewRole>({
        params: {
            limit: 100,
        },
        route: routeCrewRoles,
    });

export const useGetAvailableCrewMembers = (missionId: string, filter: availabilityFilters) =>
    useGetAllService<CrewMemberWithReservations>({
        params: {
            ...filter,
        },
        route: `${routeCrewMembers}/availability/${missionId}`,
        options: { manual: true },
    });

const aircraftTypeRoute = `${NETWORK_SCHEDULING_MANAGEMENT}/aircraft-types`;

export const useGetAircraft = (aircraftId: string) =>
    useGetService<Aircraft>({
        route: `${NETWORK_SCHEDULING_MANAGEMENT}/aircraft`,
        resourceId: aircraftId,
        options: { manual: true },
    });

export const useGetAllAircraftTypes = (
    pageNumber: number = 1,
    pageSize: number = 100,
    orderByParameter?: string,
    filterString?: string
) =>
    useGetAllService<AircraftType>({
        params: {
            page: pageNumber,
            size: pageSize,
            ...(orderByParameter && { orderBy: orderByParameter }),
            ...(filterString && { filter: filterString }),
            vt912: "true",
        },
        route: aircraftTypeRoute,
    });

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
            vt912: "true",
        },
        route: `${NETWORK_SCHEDULING_MANAGEMENT}/aircraft`,
    });
