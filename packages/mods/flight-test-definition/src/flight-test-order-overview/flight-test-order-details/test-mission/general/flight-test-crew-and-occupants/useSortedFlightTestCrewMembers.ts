import type { FlightTestCrew, FlightTestCrewPatch } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllFlightTestCrewQuery } from "@voloiq/flight-test-definition-api/v1";
import { useFlightTestCrewAndOccupantsTranslation } from "./translations/useFlightTestCrewAndOccupantsTranslation";

const formatFlightTestCrewMembers = (
    flightTestCrew: FlightTestCrew[],
    fixedRoleNames: {
        pilotInCommand: string;
        testConductor: string;
    }
): Partial<FlightTestCrewPatch>[] => {
    const pilotInCommand = flightTestCrew.find(
        (flightTestCrewMember) => flightTestCrewMember.role === fixedRoleNames.pilotInCommand
    );
    const testConductor = flightTestCrew.find(
        (flightTestCrewMember) => flightTestCrewMember.role === fixedRoleNames.testConductor
    );
    const additionalCrewMembers = flightTestCrew.filter(
        (flightTestCrewMember) =>
            flightTestCrewMember.role !== fixedRoleNames.pilotInCommand &&
            flightTestCrewMember.role !== fixedRoleNames.testConductor
    );

    return [
        pilotInCommand ?? { role: fixedRoleNames.pilotInCommand, id: "" },
        testConductor ?? { role: fixedRoleNames.testConductor, id: "" },
        ...additionalCrewMembers,
    ];
};

export type UseSortedFlightTestCrewMembersOptions = {
    flightTestOrderId: string;
};

export const useSortedFlightTestCrewMembers = (options: UseSortedFlightTestCrewMembersOptions) => {
    const { flightTestOrderId } = options;

    const { t } = useFlightTestCrewAndOccupantsTranslation();
    const { flightTestCrew } = useGetAllFlightTestCrewQuery({ flightTestOrderId });
    const sortedFlightTestCrewMembers = formatFlightTestCrewMembers(flightTestCrew, {
        pilotInCommand: t("Pilot in Command"),
        testConductor: t("Test Conductor"),
    });

    return {
        flightTestCrewMembers: sortedFlightTestCrewMembers,
    };
};
