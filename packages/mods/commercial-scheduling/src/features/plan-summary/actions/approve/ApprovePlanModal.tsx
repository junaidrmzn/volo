import { Box, Button, ButtonGroup, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { Plan, useApprovePlan } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryTranslation } from "../../translations/usePlanSummaryTranslation";

type ApprovePlanModalProps = {
    isOpen: boolean;
    plan: Plan;
    closeModal: () => void;
    refetchPlan: () => void;
};

export const ApprovePlanModal = (props: ApprovePlanModalProps) => {
    const { plan, isOpen, closeModal, refetchPlan } = props;
    const { t } = usePlanSummaryTranslation();
    const { sendRequest } = useApprovePlan(plan.id ?? "-1");
    const toast = useToast();

    const onApprove = () => {
        sendRequest({
            data: plan,
        }).then(() => {
            refetchPlan();
            closeModal();
            toast({
                status: "success",
                title: t("overview.actions.approve.toast.title"),
                description: t("overview.actions.approve.toast.description"),
            });
        });
    };

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("overview.actions.approve.modal.heading")}
            subHeading={t("overview.actions.approve.modal.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("overview.actions.approve.modal.description")}</Text>
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button onClick={closeModal}>{t("generic.Cancel")}</Button>
                            <Button variant="primary" onClick={onApprove}>
                                {t("overview.actions.approve.modal.Approve")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
