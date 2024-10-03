import { EarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import { RenderActionsHandlerOptions, ResourceListItemOptions, ResourceOverview } from "@voloiq/resource-overview";
import { EarlyAccessActionBar } from "./action-bar/EarlyAccessActionBar";
import { EarlyAccessListItem } from "./list/EarlyAccessListItem";
import { useEarlyAccessMachineConfig } from "./useEarlyAccessMachineConfig";

export const EarlyAccessOverview = () => {
    const { earlyAccessMachineConfig } = useEarlyAccessMachineConfig();

    return (
        <ResourceOverview<EarlyAccess> machineConfig={earlyAccessMachineConfig}>
            <ResourceOverview.ListItem>
                {(earlyAccess: EarlyAccess, options: ResourceListItemOptions) => (
                    <EarlyAccessListItem earlyAccess={earlyAccess} {...options} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.ActionBar>
                {(options: RenderActionsHandlerOptions) => <EarlyAccessActionBar {...options} />}
            </ResourceOverview.ActionBar>
        </ResourceOverview>
    );
};
