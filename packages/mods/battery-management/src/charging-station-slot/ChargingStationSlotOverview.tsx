import { CardListItem } from "@volocopter/design-library-react";
import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { ResourceOverview } from "@voloiq/resource-overview";
import { CreateChargingStationSlot } from "./create/CreateChargingStationSlot";
import { EditChargingStationSlot } from "./edit/EditChargingStationSlot";
import { ChargingStationSlotListItem } from "./list/ChargingStationSlotListItem";
import { ChargingStationSlotPreview } from "./preview/ChargingStationSlotPreview";
import { useChargingStationSlotOverviewConfig } from "./useChargingStationSlotOverviewConfig";

export const ChargingStationSlotOverview = () => {
    const { chargingStationSlotOverviewConfig } = useChargingStationSlotOverviewConfig();

    return (
        <ResourceOverview<ChargingStationSlot> machineConfig={chargingStationSlotOverviewConfig}>
            <ResourceOverview.ListItem>
                {(chargingStationSlot: ChargingStationSlot, cardListItemProps: CardListItemProps) => (
                    <CardListItem {...cardListItemProps}>
                        <ChargingStationSlotListItem chargingStationSlot={chargingStationSlot} />
                    </CardListItem>
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(chargingStationSlot: ChargingStationSlot) => (
                    <ChargingStationSlotPreview chargingStationSlot={chargingStationSlot} />
                )}
            </ResourceOverview.Preview>
            <ResourceOverview.Edit>{EditChargingStationSlot}</ResourceOverview.Edit>
            <ResourceOverview.Add>{CreateChargingStationSlot}</ResourceOverview.Add>
        </ResourceOverview>
    );
};
