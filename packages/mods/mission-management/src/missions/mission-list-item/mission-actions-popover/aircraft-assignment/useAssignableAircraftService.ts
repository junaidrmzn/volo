import type { CrewConfiguration } from "@voloiq-typescript-api/aircraft-management-types";
import type { Service, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { Mission, useGetAllAvailableAircraft } from "@voloiq/network-schedule-management-api/v1";
import type { availabilityFilters } from "../availabilityFilters";
import type { aircraftFilters } from "./aircraftFilters";

export const generateFilterStringForAssignableAircraftOld = (
    service: Service,
    typeOfOperation: TypeOfOperation,
    validityStartDate: string | undefined,
    validityEndDate: string | undefined,
    aircraftTypeId?: string
) => {
    const aircraftCrewConfiguration: CrewConfiguration = match(typeOfOperation)
        .with("PILOTED", () => "CREWED" as const)
        .with("REMOTE_PILOTED", () => "UNCREWED" as const)
        .with("UNKNOWN", () => "UNKNOWN" as const)
        .exhaustive();
    const filterObject: aircraftFilters = {
        start: validityStartDate || "",
        end: validityEndDate || "",
        ...(service && { services: service }),
        ...(aircraftCrewConfiguration && { crewConfiguration: aircraftCrewConfiguration }),
        ...(aircraftTypeId && { aircraftTypeId }),
    };

    return filterObject;
};

export const generateFilterStringForAssignableAircraft = (
    validityStartDate: string | undefined,
    validityEndDate: string | undefined,
    filters?: string,
    showConflicts?: boolean
) => {
    const filterObject: availabilityFilters = {
        startDate: validityStartDate || "",
        endDate: validityEndDate || "",
        ...(filters && { filter: filters }),
        ...(showConflicts !== undefined && { showConflicts }),
    };

    return filterObject;
};

export const useGetAllAssignableAircraft = (
    startDate: string,
    endDate: string,
    mission: Mission,
    filters: string,
    showConflicts?: boolean
) => {
    const validityFilter = `validFrom LE '${mission.departureDateTime}' AND validTo GE '${mission.arrivalDateTime}'`;
    const filter = generateFilterStringForAssignableAircraft(
        showConflicts ? startDate : mission.aircraftReservationStartDateTime,
        showConflicts ? endDate : mission.aircraftReservationEndDateTime,
        filters ? `${filters} AND ${validityFilter}` : validityFilter,
        showConflicts
    );
    const { data, state } = useGetAllAvailableAircraft({ missionId: mission.id, params: filter });
    return { data, state };
};
