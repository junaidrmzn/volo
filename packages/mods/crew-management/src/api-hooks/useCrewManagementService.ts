import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import type { CrewMemberBlockingTime, CrewMemberPartial } from "@voloiq-typescript-api/crew-api-types";
import { Region } from "@voloiq-typescript-api/vertiport-management-types";
import { CrewMembersBlockingTimes } from "@voloiq/crew-management-api/v1";
import { useGetAllService, useGetParamsService } from "@voloiq/service";
import { CREW_API } from "./serviceEndpoints";

const routes = `${CREW_API}/crew-management`;
const aircraftTypeRoute = `${CREW_API}/aircraft-types`;
const regionRoute = `${CREW_API}/regions`;

export const MEMBER_PAGE_SIZE = 10;
export const CALENDAR_PAGE_SIZE = 100;
export const CALENDAR_ORDER = "startTime:desc";

export const useGetCrewMemberCalendar = (page: number, id: string) =>
    useGetAllService<CrewMemberBlockingTime>({
        params: {
            page,
            size: MEMBER_PAGE_SIZE,
        },
        route: `${routes}/${id}/calendar`,
    });

type UseGetCrewMembersCalendarsOptions = {
    crewMemberMails: string[];
    startDateTime: string;
    endDateTime: string;
};

export const useGetCrewMembersCalendars = (options: UseGetCrewMembersCalendarsOptions) => {
    const { crewMemberMails, startDateTime, endDateTime } = options;

    const { data: CrewMembersCalendars, sendRequest: refetchCrewMembersCalendars } =
        useGetAllService<CrewMembersBlockingTimes>({
            route: `${routes}/calendar`,
            params: {
                page: 1,
                size: CALENDAR_PAGE_SIZE,
                startDateTime,
                endDateTime,
                crewMemberMails: String(crewMemberMails),
                orderBy: CALENDAR_ORDER,
            },
        });

    return { CrewMembersCalendars, refetchCrewMembersCalendars };
};

export const useGetCrewMembersByName = (crewMemberName: string) =>
    useGetParamsService<CrewMemberPartial>({ route: `${routes}/calendar/search`, params: { name: crewMemberName } });

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

type GetAllRegionsOptions = { manual: boolean };

export const useGetAllRegionsOptions = (options?: GetAllRegionsOptions) =>
    useGetAllService<Region>({
        params: {
            limit: 100,
        },
        options: { manual: options?.manual ?? false },
        route: regionRoute,
    });
