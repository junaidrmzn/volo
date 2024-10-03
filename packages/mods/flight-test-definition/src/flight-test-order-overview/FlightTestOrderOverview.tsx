import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import type { FlightTestOrder as FlightTestOrderV2 } from "@voloiq/flight-test-definition-api/v2";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { AddFlightTestOrderForm } from "./add-flight-test-order/AddFlightTestOrderForm";
import { FlightTestOrderListItemV2 } from "./flight-test-order-list-item-v2/FlightTestOrderListItemV2";
import { FlightTestOrderListItem } from "./flight-test-order-list-item/FlightTestOrderListItem";
import { useFlightTestOrderMachineConfig } from "./flight-test-order-machine-config/useFlightTestOrderMachineConfig";

export const FlightTestOrderOverview = () => {
    const { flightTestOrderMachineConfig } = useFlightTestOrderMachineConfig();

    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <ResourceOverview machineConfig={flightTestOrderMachineConfig}>
            {isFeatureFlagEnabled("vte-1516") ? (
                <ResourceOverview.ListItem>
                    {(flightTestOrder: FlightTestOrderV2) => (
                        <FlightTestOrderListItemV2 flightTestOrder={flightTestOrder} />
                    )}
                </ResourceOverview.ListItem>
            ) : (
                <ResourceOverview.ListItem>
                    {(flightTestOrder: FlightTestOrder) => (
                        <FlightTestOrderListItem flightTestOrder={flightTestOrder} />
                    )}
                </ResourceOverview.ListItem>
            )}
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <AddFlightTestOrderForm {...props} />}
            </ResourceOverview.Add>
        </ResourceOverview>
    );
};
