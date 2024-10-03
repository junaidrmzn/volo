import { CardListItemProps } from "@volocopter/design-library-react";
import { Plan, PlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { AlertSnackBar } from "@voloiq/commercial-scheduling-components";
import { RenderSidePanelHandlerOptions, ResourceListItemOptions, ResourceOverview } from "@voloiq/resource-overview";
import { PlanSummaryActionBar } from "./actions/PlanSummaryActionBar";
import { PlanSummaryListItem } from "./list/PlanSummaryListItem";
import { PlanSummarySidePanel } from "./side-panel/PlanSummarySidePanel";
import { usePlanSummaryMachineConfig } from "./usePlanSummaryMachineConfig";

type PlanSummaryProps = {
    plan: Plan;
    reloadPlan: () => void;
    changeTab: () => void;
};

export const PlanSummaryOverview = (props: PlanSummaryProps) => {
    const { plan, reloadPlan, changeTab } = props;
    const { id, planName, status: planStatus, scheduleItemWrtConnectionState: connectionsState } = plan;
    const { planSummaryMachineConfig, isApprovedAll, setIsApprovedAll } = usePlanSummaryMachineConfig(id, planName);
    const showApproveReject = connectionsState === "ALL_CONSISTENT" && isApprovedAll;
    return (
        <>
            {connectionsState !== "ALL_CONSISTENT" ? <AlertSnackBar status={connectionsState} /> : null}
            <ResourceOverview<PlanSummary> machineConfig={planSummaryMachineConfig}>
                <ResourceOverview.ActionBar>
                    {(options: RenderSidePanelHandlerOptions) => (
                        <PlanSummaryActionBar
                            plan={plan}
                            reloadPlan={reloadPlan}
                            changeTab={changeTab}
                            showApproveReject={showApproveReject}
                            {...options}
                        />
                    )}
                </ResourceOverview.ActionBar>
                <ResourceOverview.ListItem>
                    {(planSummary: PlanSummary, _: CardListItemProps, options: ResourceListItemOptions) => (
                        <PlanSummaryListItem
                            planSummary={planSummary}
                            planStatus={planStatus}
                            reloadPlan={reloadPlan}
                            planConnectionsState={connectionsState}
                            {...options}
                        />
                    )}
                </ResourceOverview.ListItem>
                <ResourceOverview.SidePanel>
                    {(options: RenderSidePanelHandlerOptions) => (
                        <PlanSummarySidePanel
                            planId={id}
                            reloadPlan={reloadPlan}
                            setIsApprovedAll={setIsApprovedAll}
                            {...options}
                        />
                    )}
                </ResourceOverview.SidePanel>
            </ResourceOverview>
        </>
    );
};
