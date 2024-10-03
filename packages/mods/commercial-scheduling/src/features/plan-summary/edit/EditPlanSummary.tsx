import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { PlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import { EditPlanSummaryModal } from "./EditPlanSummaryModal";

type EditPlanSummaryProps = {
    planSummary: PlanSummary;
    reloadList: () => void;
    reloadPlan: () => void;
};

export const EditPlanSummary = (props: EditPlanSummaryProps) => {
    const { reloadList, reloadPlan, planSummary } = props;
    const canEdit = useIsAuthorizedTo(["update"], ["PlanSummary"]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePlanSummaryTranslation();
    const reload = () => {
        reloadList();
        reloadPlan();
    };

    return canEdit ? (
        <>
            <IconButton aria-label={t("overview.editAriaLabel")} variant="ghost" size="md" onClick={onOpen}>
                <Icon icon="penWithBox" />
            </IconButton>
            <EditPlanSummaryModal
                isOpen={isOpen}
                closeModal={onClose}
                overwrite={false}
                planSummary={planSummary}
                reload={reload}
            />
        </>
    ) : null;
};
