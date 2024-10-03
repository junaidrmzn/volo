import { CrewMemberWithReservations } from "@voloiq-typescript-api/crew-api-types";
import { useEffect, useState } from "react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useGetAvailableCrewMembers } from "../../../../api-hooks/useNetworkSchedulingService";
import { useErrorToast } from "../../../hooks/useErrorToast";
import type { availabilityFilters } from "../availabilityFilters";

const extractRolesWithFilter = (filters?: string) => {
    if (filters) {
        const matches = filters.match(/roleAssignments IN \[([^\]]+)]/);
        if (matches && matches.length > 1) {
            const rolesString = matches[1];
            if (rolesString) {
                const roles = rolesString
                    .replace(/"/g, "")
                    .split(", ")
                    .map((role) => role.trim())
                    .join(",");
                return { roles };
            }
        }
    }
    return undefined;
};

const deleteRolesFilter = (filters?: string) => {
    if (filters) {
        return filters.replace(/roleAssignments IN \[[^\]]+]( AND)?/, "");
    }
    return undefined;
};

export const generateFilterStringForAssignableCrewMember = (
    validityStartDate: string | undefined,
    validityEndDate: string | undefined,
    filters?: string,
    showConflicts?: boolean
) => {
    const crewMemberFilter = deleteRolesFilter(filters);

    const filterObject: availabilityFilters = {
        startDate: validityStartDate || "",
        endDate: validityEndDate || "",
        ...extractRolesWithFilter(filters),
        ...(filters && { filter: crewMemberFilter }),
        ...(showConflicts !== undefined && { showConflicts }),
    };

    return filterObject;
};

export const useGetAllAssignableCrewMember = (
    startDate: string,
    endDate: string,
    mission: Mission,
    filters: string,
    showConflicts?: boolean
) => {
    const validityFilter = `validFrom LE '${mission.estimatedDepartureDateTime}' AND validTo GE '${mission.estimatedArrivalDateTime}'`;
    const filter = generateFilterStringForAssignableCrewMember(
        showConflicts ? startDate : mission.crewReservationStartDateTime,
        showConflicts ? endDate : mission.crewReservationEndDateTime,
        filters ? `${filters} AND ${validityFilter}` : validityFilter,
        showConflicts
    );
    const [init, setInit] = useState<boolean>(false);
    const [availableCrewMembers, setAvailableCrewMembers] = useState<CrewMemberWithReservations[]>([]);
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
        if (!init) {
            fetchAvailableCrewMembers();
            setInit(true);
        }
    }, [sendRequest, onError, init]);

    return { availableCrewMembers, state };
};
