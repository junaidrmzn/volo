import { VStack, useDisclosure } from "@volocopter/design-library-react";
import { EditButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { FlightTestCrewAndOccupantsTable } from "./FlightTestCrewAndOccupantsTable";
import { FlightTestCrewAndOccupantsModal } from "./flight-test-crew-and-occupants-modal/FlightTestCrewAndOccupantsModal";
import { useFlightTestCrewAndOccupantsTranslation } from "./translations/useFlightTestCrewAndOccupantsTranslation";
import { useSortedFlightTestCrewMembers } from "./useSortedFlightTestCrewMembers";

export type FlightTestCrewAndOccupantsSectionProps = {
    flightTestOrderId: string;
};

export const FlightTestCrewAndOccupantsSection = (props: FlightTestCrewAndOccupantsSectionProps) => {
    const { flightTestOrderId } = props;

    const { isOpen, onClose, onOpen } = useDisclosure();

    const { t } = useFlightTestCrewAndOccupantsTranslation();
    const { flightTestCrewMembers } = useSortedFlightTestCrewMembers({ flightTestOrderId });

    return (
        <VStack spacing={6} boxSize="full" role="region" aria-label={t("Flight Test Crew & Occupants")}>
            <SectionHeader label={t("Flight Test Crew & Occupants")}>
                <EditButton resourceName={t("Flight Test Crew & Occupants")} onClick={onOpen} />
            </SectionHeader>

            <FlightTestCrewAndOccupantsTable flightTestCrewMembers={flightTestCrewMembers} />

            <FlightTestCrewAndOccupantsModal
                flightTestCrewMembers={flightTestCrewMembers}
                flightTestOrderId={flightTestOrderId}
                isOpen={isOpen}
                onClose={onClose}
            />
        </VStack>
    );
};
