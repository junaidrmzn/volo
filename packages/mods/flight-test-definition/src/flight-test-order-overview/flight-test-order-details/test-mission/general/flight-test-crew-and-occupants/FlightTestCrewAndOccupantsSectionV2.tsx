import { useQueryClient } from "@tanstack/react-query";
import { VStack, useDisclosure } from "@volocopter/design-library-react";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { EditButton, SubSection } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { FlightTestCrewAndOccupantsTable } from "./FlightTestCrewAndOccupantsTable";
import { FlightTestCrewAndOccupantsModal } from "./flight-test-crew-and-occupants-modal/FlightTestCrewAndOccupantsModal";
import { useFlightTestCrewAndOccupantsTranslation } from "./translations/useFlightTestCrewAndOccupantsTranslation";
import { useSortedFlightTestCrewMembers } from "./useSortedFlightTestCrewMembers";

export type FlightTestCrewAndOccupantsSectionV2Props = {
    flightTestOrderId: string;
    resourceId?: string;
};

export const FlightTestCrewAndOccupantsSectionV2 = (props: FlightTestCrewAndOccupantsSectionV2Props) => {
    const { flightTestOrderId, resourceId } = props;

    const { isOpen, onClose, onOpen } = useDisclosure();

    const { t } = useFlightTestCrewAndOccupantsTranslation();
    const { flightTestCrewMembers } = useSortedFlightTestCrewMembers({ flightTestOrderId });

    const queryClient = useQueryClient();

    const flightTestOrder: FlightTestOrder | undefined = queryClient.getQueryData([
        "FlightTestOrderV2",
        flightTestOrderId,
    ]);

    const isEditable =
        flightTestOrder && (flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL");

    return (
        <SubSection
            bodyContent={
                <VStack boxSize="full" role="region" aria-label={t("Flight Test Crew & Occupants")}>
                    <SectionHeader id={resourceId} label={t("Crew & Occupants")}>
                        {isEditable && <EditButton resourceName={t("Crew & Occupants")} onClick={onOpen} />}
                    </SectionHeader>

                    <FlightTestCrewAndOccupantsTable flightTestCrewMembers={flightTestCrewMembers} />

                    <FlightTestCrewAndOccupantsModal
                        flightTestCrewMembers={flightTestCrewMembers}
                        flightTestOrderId={flightTestOrderId}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </VStack>
            }
        />
    );
};
