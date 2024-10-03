import { Box, Button, ButtonGroup, HStack, Text, VStack } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryTranslation } from "../../translations/usePlanSummaryTranslation";

type ApprovePlanModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    onRequestApproval: () => void;
};

export const RequestPlanApprovalModal = (props: ApprovePlanModalProps) => {
    const { isOpen, closeModal, onRequestApproval } = props;
    const { t } = usePlanSummaryTranslation();

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("overview.actions.request.modal.heading")}
            subHeading={t("overview.actions.request.modal.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("overview.actions.request.modal.description")}</Text>
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button onClick={closeModal}>{t("generic.Cancel")}</Button>
                            <Button variant="primary" onClick={onRequestApproval}>
                                {t("overview.actions.request.title")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
