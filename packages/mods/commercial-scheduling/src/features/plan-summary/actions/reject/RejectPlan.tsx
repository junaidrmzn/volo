import { Button, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryTranslation } from "../../translations/usePlanSummaryTranslation";
import { RejectPlanModal } from "./RejectPlanModal";

type Props = {
    plan: Plan;
    refetchPlan: () => void;
};

export const RejectPlan = (props: Props): ReactElement | null => {
    const { plan, refetchPlan } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePlanSummaryTranslation();
    const canBeRejected = plan.status === "AWAITING_APPROVAL";

    return (
        <>
            <Button variant="secondary" size="md" isDisabled={!canBeRejected} onClick={onOpen}>
                {t("overview.actions.reject.title")}
            </Button>
            <RejectPlanModal isOpen={isOpen} plan={plan} closeModal={onClose} refetchPlan={refetchPlan} />
        </>
    );
};
