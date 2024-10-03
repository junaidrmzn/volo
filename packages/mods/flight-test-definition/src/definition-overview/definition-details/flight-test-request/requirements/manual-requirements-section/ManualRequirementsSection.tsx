import { Spinner, VStack, useDisclosure } from "@volocopter/design-library-react";
import { ModalTriggerButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { useDefinition } from "../../../definition-context/useDefinition";
import { ManualRequirementsList } from "./ManualRequirementsList";
import { ManualRequirementsModal } from "./manual-requirements-modal/ManualRequirementsModal";
import { useManualRequirements } from "./manual-requirements-modal/useManualRequirements";
import { useRequirementsSectionTranslation } from "./translations/useRequirementsSectionTranslation";

export const ManualRequirementsSection = () => {
    const { t } = useRequirementsSectionTranslation();
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { manualRequirements, manualRequirementsCount, isLoading } = useManualRequirements({ definitionId });

    const operationType = manualRequirementsCount === 0 ? "add" : "edit";

    return (
        <VStack spacing={3} alignItems="stretch">
            <SectionHeader label={t("Manual Applicable Requirements")}>
                {isLoading ? (
                    <Spinner size="sm" />
                ) : (
                    <ModalTriggerButton
                        onClick={onOpen}
                        triggerType="iconButton"
                        operationType={operationType}
                        resourceName={t("Manual Requirements")}
                    />
                )}
            </SectionHeader>
            {!isLoading && operationType === "add" && (
                <ModalTriggerButton
                    triggerType="secondaryButton"
                    operationType={operationType}
                    onClick={onOpen}
                    resourceName={t("Manual Requirements")}
                />
            )}
            <ManualRequirementsList manualRequirements={manualRequirements} />
            <ManualRequirementsModal isOpen={isOpen} onClose={onClose} definitionId={definitionId} />
        </VStack>
    );
};
