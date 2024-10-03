import { Button, useDisclosure, useToast } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { Plan, useUpdatePlanStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryTranslation } from "../../translations/usePlanSummaryTranslation";
import { RequestPlanApprovalModal } from "./RequestPlanApprovalModal";

type Props = {
    plan: Plan;
    reloadPlan: () => void;
    reloadList: () => void;
};

export const RequestPlanApproval = (props: Props): ReactElement | null => {
    const { plan, reloadPlan, reloadList } = props;
    const { id, scheduleItemWrtConnectionState: connectionsState } = plan;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePlanSummaryTranslation();

    const toast = useToast();
    const { sendRequest } = useUpdatePlanStatus(id);

    const onRequestApproval = () => {
        const title = t("overview.actions.request.toast.title");
        sendRequest({ data: { status: "AWAITING_APPROVAL" } })
            .then(() => {
                onClose();
                reloadPlan();
                reloadList();
                toast({
                    status: "success",
                    title,
                    description: t("overview.actions.request.toast.success.description"),
                });
            })
            .catch(() => {
                toast({
                    status: "error",
                    title,
                    description: t("overview.actions.request.toast.error.description"),
                });
            });
    };

    const onClickRequestApproval = () => {
        if (connectionsState === "ALL_CONSISTENT") {
            onRequestApproval();
            return;
        }
        onOpen();
    };

    return (
        <>
            <Button variant="primary" onClick={onClickRequestApproval}>
                {t("overview.actions.request.title")}
            </Button>
            <RequestPlanApprovalModal isOpen={isOpen} closeModal={onClose} onRequestApproval={onRequestApproval} />
        </>
    );
};
