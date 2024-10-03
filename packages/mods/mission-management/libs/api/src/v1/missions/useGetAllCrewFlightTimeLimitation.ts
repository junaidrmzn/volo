import type { FlightTimeLimitation } from "@voloiq/network-schedule-management-api/v1";
import { useGetService } from "@voloiq/service";
import { CREW_MANAGEMENT } from "../../../../../src/api-hooks/serviceEndpoints";

export const useGetAllCrewFlightTimeLimitation = (pilotId: string, estimatedDepartureDate: string) => {
    const { data, state } = useGetService<FlightTimeLimitation>({
        route: `${CREW_MANAGEMENT}/crew-management`,
        resourceId: `${pilotId}/ftl/${estimatedDepartureDate}`,
    });

    return { data, state };
};
