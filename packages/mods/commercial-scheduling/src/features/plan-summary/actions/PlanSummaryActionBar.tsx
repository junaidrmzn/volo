import { ButtonGroup } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { ApprovePlan } from "./approve/ApprovePlan";
import { RejectPlan } from "./reject/RejectPlan";
import { RequestPlanApproval } from "./request-approval/RequestPlanApproval";

type PlanHeaderProps = {
    plan: Plan;
    reloadPlan: () => void;
    reloadList: () => void;
    changeTab: () => void;
    showApproveReject: boolean;
};

export const PlanSummaryActionBar = (props: PlanHeaderProps) => {
    const { plan, reloadPlan, reloadList, changeTab, showApproveReject } = props;
    const { status } = plan;

    const resource = "CommercialPlan";
    const canApprove = useIsAuthorizedTo(["approve"], [resource]);
    const canReject = useIsAuthorizedTo(["reject"], [resource]);
    const canRequest = useIsAuthorizedTo(["request-approval"], [resource]);
    const reloadPlanAndList = () => {
        reloadPlan();
        reloadList();
    };
    const reloadPlanListAndChangeTab = () => {
        reloadPlan();
        reloadList();
        changeTab();
    };

    return (
        <ButtonGroup>
            {match(status)
                .with("DRAFT", () => canRequest && <RequestPlanApproval {...props} />)
                .with("AWAITING_APPROVAL", () =>
                    showApproveReject ? (
                        <>
                            {canApprove && <ApprovePlan plan={plan} refetchPlan={reloadPlanAndList} />}
                            {canReject && <RejectPlan plan={plan} refetchPlan={reloadPlanListAndChangeTab} />}
                        </>
                    ) : null
                )
                .otherwise(() => null)}
        </ButtonGroup>
    );
};
