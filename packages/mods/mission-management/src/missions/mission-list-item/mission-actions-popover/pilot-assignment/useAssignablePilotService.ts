import type { CrewMemberWithReservations, CrewRole } from "@voloiq-typescript-api/crew-api-types";
import { useEffect, useState } from "react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useGetAllCrewRoles, useGetAvailableCrewMembers } from "../../../../api-hooks/useNetworkSchedulingService";
import { useErrorToast } from "../../../hooks/useErrorToast";
import type { availabilityFilters } from "../availabilityFilters";

export const generateFilterStringForAssignablePilot = (
    validityStartDate: string | undefined,
    validityEndDate: string | undefined,
    crewRoles: CrewRole[],
    filters?: string,
    showConflicts?: boolean,
    aircraftType?: string
) => {
    const filterObject: availabilityFilters = {
        startDate: validityStartDate || "",
        endDate: validityEndDate || "",
        ...(filters && { filter: filters }),
        ...(showConflicts !== undefined && { showConflicts }),
        roles: crewRoles
            .filter((role) => role.roleKey === "PIL" || role.canBecomePilotInCharge)
            .map((role) => role.id)
            .join(","),
        ...(aircraftType && { aircraftTypeId: aircraftType }),
    };

    return filterObject;
};

export const useGetAllAssignablePilots = (
    startDate: string,
    endDate: string,
    mission: Mission,
    filters: string,
    showConflicts?: boolean
) => {
    const validityFilter = `validFrom LE '${mission.estimatedDepartureDateTime}' AND validTo GE '${mission.estimatedArrivalDateTime}' AND licenseValidUntil GE '${mission.estimatedArrivalDateTime}'`;
    const { data: crewRoles } = useGetAllCrewRoles();
    const [init, setInit] = useState<boolean>(false);
    const [availableCrewMembers, setAvailableCrewMembers] = useState<CrewMemberWithReservations[]>([]);
    const filter = generateFilterStringForAssignablePilot(
        showConflicts ? startDate : mission.crewReservationStartDateTime,
        showConflicts ? endDate : mission.crewReservationEndDateTime,
        crewRoles,
        filters ? `${filters} AND ${validityFilter}` : validityFilter,
        showConflicts,
        mission.assignments?.aircraftTypeId
    );

    const { sendRequest, state } = useGetAvailableCrewMembers(mission.id, filter);
    const { onError } = useErrorToast();
    useEffect(() => {
        const fetchAvailableCrewMembers = async () => {
            await sendRequest({})
                .then((response) => {
                    if (response) {
                        setAvailableCrewMembers(response);
                    }
                })
                .catch((error) => {
                    onError(error);
                });
        };
        if (crewRoles.length > 0 && !init) {
            fetchAvailableCrewMembers();
            setInit(true);
        }
    }, [sendRequest, init, onError, crewRoles]);

    return { availableCrewMembers, state };
};
