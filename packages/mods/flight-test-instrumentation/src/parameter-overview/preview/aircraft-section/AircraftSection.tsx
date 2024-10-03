import { GridItem, useDisclosure } from "@volocopter/design-library-react";
import { PreviewSection } from "@voloiq/text-layouts";
import { Parameter } from "../../../libs/fti-api/apiModels";
import { AircraftCard } from "./AircraftCard";
import { AircraftSectionModal } from "./AircraftSectionModal";
import { useAircraftSectionTranslation } from "./translations/useAircraftSectionTranslation";
import { useAircraftSection } from "./useAircraftSection";

export type AircraftSectionSectionProps = {
    parameter: Parameter;
    onStatusChange: () => void;
};

export const AircraftSection = (props: AircraftSectionSectionProps) => {
    const { parameter, onStatusChange } = props;
    const { id, aircrafts, sensorType, ataIspec } = parameter;

    const { t } = useAircraftSectionTranslation();
    const { isOpen: isEditModalOpen, onClose: onCloseEditModal, onOpen: onOpenEditModal } = useDisclosure();
    const { selectedAircraftId, setSelectedAircraftId } = useAircraftSection();

    const isStatusChangeAllowed = sensorType !== undefined && ataIspec !== undefined;
    const selectedAircraft =
        aircrafts && aircrafts.length > 0 && aircrafts.find((aircraft) => aircraft?.id === selectedAircraftId);
    const onOpenEditAircraftModal = (aircraftId: string) => {
        onOpenEditModal();
        setSelectedAircraftId(aircraftId);
    };

    return (
        <>
            <PreviewSection headerLabel={t("title")}>
                <GridItem gridColumn="1 / -1">
                    {aircrafts &&
                        aircrafts.length > 0 &&
                        aircrafts.map((aircraft) => (
                            <AircraftCard
                                openModal={onOpenEditAircraftModal}
                                aircraft={aircraft}
                                status={aircraft.status}
                                key={aircraft.id}
                                isStatusChangeAllowed={isStatusChangeAllowed}
                            />
                        ))}
                </GridItem>
            </PreviewSection>
            {selectedAircraft && (
                <AircraftSectionModal
                    parameterId={id}
                    parameterStatus={selectedAircraft.status}
                    aircraft={selectedAircraft}
                    onClose={onCloseEditModal}
                    onStatusChange={onStatusChange}
                    isOpen={isEditModalOpen}
                />
            )}
        </>
    );
};
