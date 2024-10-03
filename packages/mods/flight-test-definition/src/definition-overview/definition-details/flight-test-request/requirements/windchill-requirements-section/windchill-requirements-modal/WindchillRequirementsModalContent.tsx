import { Box, Button, HStack, Icon, VStack } from "@volocopter/design-library-react";
import { SearchResultWindchillRequirementsList } from "./SearchResultWindchillRequirementsList";
import { SelectedWindchillRequirementsList } from "./SelectedWindchillRequirementsList";
import { useWindchillRequirementsModalTranslation } from "./translations/useWindchillRequirementsModalTranslation";
import { useAssignedWindchillRequirements } from "./useAssignedWindchillRequirements";
import { useEditWindchillRequirements } from "./useEditWindchillRequirements";
import { useSelectWindchillRequirements } from "./useSelectWindchillRequirements";
import { useSubmitWindchillRequirementsModal } from "./useSubmitWindchillRequirementsModal";

type WindchillRequirementsModalContentProps = {
    onAfterSubmit: () => void;
};

export const WindchillRequirementsModalContent = (props: WindchillRequirementsModalContentProps) => {
    const { onAfterSubmit } = props;

    const { t } = useWindchillRequirementsModalTranslation();
    const {
        assignedWindchillRequirements,
        areAssignOperationsLoading,
        assignWindchillRequirements,
        unassignWindchillRequirements,
    } = useAssignedWindchillRequirements();

    const { getSelectedRequirementIds, handleCheckboxOnChange, selectedWindchillRequirements } =
        useSelectWindchillRequirements({
            assignedWindchillRequirements,
        });
    const {
        editRequirement,
        getPassOrFailCriteria,
        editedRequirementsHash,
        bulkEditWindchillRequirements,
        bulkEditWindchillAssociatedRequirements,
        isEditWindchillRequirementsLoading,
    } = useEditWindchillRequirements({
        selectedWindchillRequirements,
    });
    const { submitRequirements } = useSubmitWindchillRequirementsModal({
        assignWindchillRequirements,
        assignedWindchillRequirements,
        editedRequirementsHash,
        selectedWindchillRequirements,
        unassignWindchillRequirements,
        bulkEditWindchillRequirements,
        bulkEditWindchillAssociatedRequirements,
    });

    const handleOnDone = () => {
        submitRequirements(onAfterSubmit);
    };

    return (
        <VStack w="full" h="full" align="flex-end" spacing={3}>
            <HStack alignItems="flex-start" width="full">
                <VStack w="full" align="flex-start" flexGrow={1} alignItems="stretch" maxH="70vh" overflowY="scroll">
                    <SearchResultWindchillRequirementsList
                        handleCheckboxOnChange={handleCheckboxOnChange}
                        selectedIds={getSelectedRequirementIds()}
                    />
                </VStack>

                <Box borderRightWidth="0.125rem" borderColor="gray300Gray800" my={1} />

                <VStack w="full" align="flex-start" flexGrow={1} alignItems="stretch" maxH="70vh" overflowY="scroll">
                    <SelectedWindchillRequirementsList
                        editRequirement={editRequirement}
                        getPassOrFailCriteria={getPassOrFailCriteria}
                        handleCheckboxOnChange={handleCheckboxOnChange}
                        selectedWindchillRequirements={selectedWindchillRequirements}
                    />
                </VStack>
            </HStack>

            <Button
                type="button"
                leftIcon={<Icon icon="check" size={4} />}
                size="lg"
                variant="primary"
                onClick={handleOnDone}
                isLoading={areAssignOperationsLoading || isEditWindchillRequirementsLoading}
            >
                {t("Done")}
            </Button>
        </VStack>
    );
};
