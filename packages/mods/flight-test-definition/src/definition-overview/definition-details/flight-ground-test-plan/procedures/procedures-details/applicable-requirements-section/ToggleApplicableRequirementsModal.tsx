import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@volocopter/design-library-react";
import { DoneButton } from "@voloiq/flight-test-definition-components";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { ApplicableRequirementCard } from "./ApplicableRequirementCard";
import { useApplicableRequirementsSectionTranslation } from "./translations/useApplicableRequirementsSectionTranslation";
import { useToggleableApplicableRequirements } from "./useToggleableApplicableRequirements";

export type ToggleApplicableRequirementsModalProps = {
    definitionId: string;
    procedureId: string;
    isOpen?: boolean;
    onClose: () => void;
};

export const ToggleApplicableRequirementsModal = (props: ToggleApplicableRequirementsModalProps) => {
    const { definitionId, procedureId, isOpen = true, onClose } = props;
    const { t } = useApplicableRequirementsSectionTranslation();
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();
    const {
        onSwitchApplicableRequirement,
        onSaveApplicableRequirements,
        getIsApplicableRequirementApplicable,
        applicableRequirements,
    } = useToggleableApplicableRequirements({
        definitionId,
        procedureId,
        editSessionId,
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Edit")} modalTitle={t("Applicable Requirements")} />
                </ModalHeader>
                <ModalBody>
                    <VStack alignItems="stretch">
                        {applicableRequirements?.map((applicableRequirement) => (
                            <ApplicableRequirementCard
                                key={applicableRequirement.id}
                                applicableRequirement={applicableRequirement}
                                withSwitch
                                onSwitchApplicableRequirement={(isApplicable) => {
                                    onSwitchApplicableRequirement({
                                        requirementId: applicableRequirement.id,
                                        isApplicable,
                                    });
                                }}
                                isEnabled={getIsApplicableRequirementApplicable(applicableRequirement.id)}
                            />
                        ))}
                        <Flex justifyContent="flex-end">
                            <DoneButton
                                onClick={() => {
                                    onSaveApplicableRequirements().then(() => {
                                        onClose();
                                    });
                                }}
                            />
                        </Flex>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
