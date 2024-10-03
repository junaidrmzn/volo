import {
    useBulkAddFlightTestCrew,
    useBulkDeleteFlightTestCrew,
    useBulkEditFlightTestCrew,
} from "@voloiq/flight-test-definition-api/v1";
import { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import { FlightTestCrewAndOccupantsFormSchema } from "./useFlightTestCrewAndOccupantsFormSchema";

export type UseFlightTestCrewAndOccupantsSectionOptions = {
    flightTestOrderId: string;
};

export const useFlightTestCrewAndOccupantsModal = (options: UseFlightTestCrewAndOccupantsSectionOptions) => {
    const { flightTestOrderId } = options;

    const { bulkAddFlightTestCrew } = useBulkAddFlightTestCrew({ flightTestOrderId });
    const { bulkEditFlightTestCrew } = useBulkEditFlightTestCrew({ flightTestOrderId });
    const { bulkDeleteFlightTestCrew } = useBulkDeleteFlightTestCrew({ flightTestOrderId });

    const onBulkAddFlightTestCrew: OnBulkAdd<FlightTestCrewAndOccupantsFormSchema> = async (newCrewMembers) => {
        await bulkAddFlightTestCrew({
            data: newCrewMembers.map((crewMember) => ({
                ...crewMember,
                category: crewMember.category?.value ?? null,
                position: crewMember.position.value,
            })),
        });
    };

    const onBulkEditFlightTestCrew: OnBulkEdit<FlightTestCrewAndOccupantsFormSchema> = async (updatedCrewMembers) => {
        await bulkEditFlightTestCrew({
            data: updatedCrewMembers.map((crewMember) => ({
                ...crewMember,
                category: crewMember.category?.value ?? null,
                position: crewMember.position.value,
            })),
        });
    };

    const onBulkDeleteFlightTestCrew: OnBulkDelete = async (deletedCrewMembersIds) => {
        await bulkDeleteFlightTestCrew({ data: deletedCrewMembersIds });
    };

    return {
        onBulkAddFlightTestCrew,
        onBulkDeleteFlightTestCrew,
        onBulkEditFlightTestCrew,
    };
};
