import { useQueryClient } from "@tanstack/react-query";
import { Spinner, VStack, useDisclosure } from "@volocopter/design-library-react";
import { ModalTriggerButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { useDefinition } from "../../../definition-context/useDefinition";
import { WindchillRequirementsList } from "./WindchillRequirementsList";
import { useWindchillRequirementsSectionTranslation } from "./translations/useWindchillRequirementsSectionTranslation";
import { WindchillRequirementsModal } from "./windchill-requirements-modal/WindchillRequirementsModal";
import { useWindchillAssociatedRequirements } from "./windchill-requirements-modal/useWindchillAssociatedRequirements";

export const WindchillRequirementsSection = () => {
    const { t } = useWindchillRequirementsSectionTranslation();
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { windchillAssociatedRequirements, isLoading, windchillAssociatedRequirementsCount } =
        useWindchillAssociatedRequirements({ definitionId });
    const operationType = windchillAssociatedRequirementsCount === 0 ? "add" : "edit";
    const queryClient = useQueryClient();

    const handleOnClose = () => {
        queryClient.invalidateQueries(["tabCounters"]);
        onClose();
    };

    return (
        <VStack spacing={3} alignItems="stretch">
            <SectionHeader label={t("Applicable Requirements From Windchill")}>
                {isLoading ? (
                    <Spinner size="sm" />
                ) : (
                    <ModalTriggerButton
                        onClick={onOpen}
                        triggerType="iconButton"
                        operationType={operationType}
                        resourceName={t("Windchill Requirements")}
                    />
                )}
            </SectionHeader>
            {!isLoading && operationType === "add" && (
                <ModalTriggerButton
                    onClick={onOpen}
                    triggerType="secondaryButton"
                    operationType={operationType}
                    resourceName={t("Windchill Requirements")}
                />
            )}
            <WindchillRequirementsList windchillRequirements={windchillAssociatedRequirements} />
            <WindchillRequirementsModal isOpen={isOpen} onClose={handleOnClose} definitionId={definitionId} />
        </VStack>
    );
};
