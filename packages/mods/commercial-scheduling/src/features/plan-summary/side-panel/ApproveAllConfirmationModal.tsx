import { Box, Button, ButtonGroup, HStack, Text, VStack } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";

type EditPriceModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    onApproveAll: () => void;
};

export const ApproveAllConfirmationModal = (props: EditPriceModalProps) => {
    const { isOpen, closeModal, onApproveAll } = props;
    const { t } = usePlanSummaryTranslation();

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("overview.sidePanel.modal.heading")}
            subHeading={t("overview.sidePanel.approveAll")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={4} alignSelf="flex-start">
                        {t("overview.sidePanel.modal.approveAllConfirm")}
                    </Text>
                    <HStack alignSelf="flex-end" mt={6}>
                        <ButtonGroup isAttached>
                            <Button type="reset" onClick={closeModal}>
                                {t("generic.Cancel")}
                            </Button>
                            <Button variant="primary" onClick={onApproveAll}>
                                {t("overview.sidePanel.modal.approve")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
