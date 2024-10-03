import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { ActionsPopoverButton } from "@voloiq/flight-test-definition-components";
import { EditFlightTestRequestModal } from "./edit-test-request-section/EditTestRequestSectionModal";
import { useTestRequestSectionTranslation } from "./translations/useTestRequestSectionTranslation";
import { UpdateFlightTestRequestStatusModal } from "./update-status/UpdateFlightTestRequestStatusModal";

export type TestRequestSectionActionsPopoverButtonProps = {
    definition: FlightTestDefinitionResponseBody;
};

export const TestRequestSectionActionsPopoverButton = (props: TestRequestSectionActionsPopoverButtonProps) => {
    const { definition } = props;

    const { t } = useTestRequestSectionTranslation();
    const { isOpen: isEditModalOpen, onClose: onCloseEditModal, onOpen: onOpenEditModal } = useDisclosure();
    const {
        isOpen: isChangeStatusModalOpen,
        onClose: onCloseChangeStatusModal,
        onOpen: onOpenChangeStatusModal,
    } = useDisclosure();

    return (
        <>
            <ActionsPopoverButton
                renderActionButtons={(onClosePopover) => (
                    <VStack spacing={3} alignItems="start">
                        <Button
                            variant="ghost"
                            size="md"
                            leftIcon={<Icon icon="edit" size={4} />}
                            onClick={() => {
                                onOpenEditModal();
                                onClosePopover();
                            }}
                        >
                            {t("Edit Test Request Section")}
                        </Button>
                        <Button
                            variant="ghost"
                            size="md"
                            leftIcon={<Icon icon="exchange" size={4} />}
                            onClick={() => {
                                onOpenChangeStatusModal();
                                onClosePopover();
                            }}
                        >
                            {t("Change Status")}
                        </Button>
                    </VStack>
                )}
            />
            <EditFlightTestRequestModal definition={definition} isOpen={isEditModalOpen} onClose={onCloseEditModal} />
            <UpdateFlightTestRequestStatusModal
                definition={definition}
                isOpen={isChangeStatusModalOpen}
                onClose={onCloseChangeStatusModal}
            />
        </>
    );
};
