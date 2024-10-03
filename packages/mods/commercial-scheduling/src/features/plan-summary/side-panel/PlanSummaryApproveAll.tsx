import { Button, useDisclosure } from "@volocopter/design-library-react";
import { PlanSummary, useApprovePlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import { ApproveAllConfirmationModal } from "./ApproveAllConfirmationModal";

type PlanSummaryApproveAllProps = {
    changeRequestItems: PlanSummary[];
    planId: string;
    refetchData: () => void;
};

export const PlanSummaryApproveAll = (props: PlanSummaryApproveAllProps) => {
    const { changeRequestItems, planId, refetchData } = props;
    const { sendRequest } = useApprovePlanSummary();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePlanSummaryTranslation();
    const onApprove = () => {
        sendRequest({
            data: {
                commercialPlanId: planId,
                commercialScheduleItemCustomizations: changeRequestItems,
            },
        }).then(() => {
            refetchData();
        });
    };

    return (
        <>
            <Button onClick={onOpen}>{t("overview.sidePanel.approveAll")}</Button>
            <ApproveAllConfirmationModal isOpen={isOpen} closeModal={onClose} onApproveAll={onApprove} />
        </>
    );
};
