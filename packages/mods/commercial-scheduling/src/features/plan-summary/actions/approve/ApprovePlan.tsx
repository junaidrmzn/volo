import { Button, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryTranslation } from "../../translations/usePlanSummaryTranslation";
import { ApprovePlanModal } from "./ApprovePlanModal";

type Props = {
    plan: Plan;
    refetchPlan: () => void;
};

export const ApprovePlan = (props: Props): ReactElement | null => {
    const { plan, refetchPlan } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePlanSummaryTranslation();
    const canBeApproved = plan.status === "AWAITING_APPROVAL";

    return (
        <>
            <Button variant="primary" size="md" isDisabled={!canBeApproved} onClick={onOpen}>
                {t("overview.actions.approve.title")}
            </Button>
            <ApprovePlanModal isOpen={isOpen} plan={plan} closeModal={onClose} refetchPlan={refetchPlan} />
        </>
    );
};
