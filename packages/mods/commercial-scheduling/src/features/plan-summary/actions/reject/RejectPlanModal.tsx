import { Box, Button, ButtonGroup, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { Plan, useRejectPlan } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryTranslation } from "../../translations/usePlanSummaryTranslation";

type RejectPlanModalProps = {
    isOpen: boolean;
    plan: Plan;
    closeModal: () => void;
    refetchPlan: () => void;
};

export const RejectPlanModal = (props: RejectPlanModalProps) => {
    const { plan, isOpen, closeModal, refetchPlan } = props;
    const { sendRequest } = useRejectPlan(plan.id ?? "-1");
    const { t } = usePlanSummaryTranslation();
    const toast = useToast();

    const onReject = () => {
        sendRequest({
            data: plan,
        }).then(() => {
            refetchPlan();
            closeModal();
            toast({
                status: "success",
                title: t("overview.actions.reject.toast.title"),
                description: t("overview.actions.reject.toast.description"),
            });
        });
    };

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("overview.actions.reject.modal.heading")}
            subHeading={t("overview.actions.reject.modal.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("overview.actions.reject.modal.description")}</Text>
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button type="reset" onClick={closeModal}>
                                {t("generic.Cancel")}
                            </Button>
                            <Button variant="primary" onClick={onReject}>
                                {t("overview.actions.reject.modal.Reject")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
