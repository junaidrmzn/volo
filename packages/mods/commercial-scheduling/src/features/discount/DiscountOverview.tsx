import { Discount } from "@voloiq/commercial-scheduling-api/v1";
import { LoadingPage } from "@voloiq/commercial-scheduling-components";
import { RenderActionsHandlerOptions, ResourceOverview } from "@voloiq/resource-overview";
import { DiscountActionBar } from "./action-bar/DiscountActionBar";
import { DiscountListItem } from "./list/DiscountListItem";
import { useDiscountMachineConfig } from "./useDiscountMachineConfig";

export const DiscountOverview = () => {
    const { discountMachineConfig, isLoading } = useDiscountMachineConfig();

    if (isLoading) return <LoadingPage />;
    return (
        <ResourceOverview<Discount> machineConfig={discountMachineConfig}>
            <ResourceOverview.ListItem>
                {(discount: Discount) => <DiscountListItem discount={discount} />}
            </ResourceOverview.ListItem>
            <ResourceOverview.ActionBar>
                {(options: RenderActionsHandlerOptions) => <DiscountActionBar {...options} />}
            </ResourceOverview.ActionBar>
        </ResourceOverview>
    );
};
