import { CardListItemProps } from "@voloiq/card-list-item";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { LoadingPage } from "@voloiq/commercial-scheduling-components";
import { RenderActionsHandlerOptions, ResourceListItemOptions, ResourceOverview } from "@voloiq/resource-overview";
import { PlanActionBar } from "./action-bar/PlanActionBar";
import { PlanListItem } from "./list/PlanListItem";
import { usePlanMachineConfig } from "./usePlanMachineConfig";

export const PlanOverview = () => {
    const { planMachineConfig, isLoading } = usePlanMachineConfig();

    if (isLoading) return <LoadingPage />;
    return (
        <ResourceOverview<Plan> machineConfig={planMachineConfig}>
            <ResourceOverview.ListItem>
                {(plan: Plan, _: CardListItemProps, options: ResourceListItemOptions) => (
                    <PlanListItem plan={plan} {...options} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.ActionBar>
                {(options: RenderActionsHandlerOptions) => <PlanActionBar {...options} />}
            </ResourceOverview.ActionBar>
        </ResourceOverview>
    );
};
