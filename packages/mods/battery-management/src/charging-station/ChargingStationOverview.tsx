import { CardListItem } from "@volocopter/design-library-react";
import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { ResourceOverview } from "@voloiq/resource-overview";
import { CreateChargingStation } from "./create/CreateChargingStation";
import { EditChargingStation } from "./edit/EditChargingStation";
import { ChargingStationListItem } from "./list/ChargingStationListItem";
import { ChargingStationPreview } from "./preview/ChargingStationPreview";
import { useChargingStationOverviewConfig } from "./useChargingStationConfig";

export const ChargingStationOverview = () => {
    const { chargingStationConfig } = useChargingStationOverviewConfig();

    return (
        <ResourceOverview<ChargingStation> machineConfig={chargingStationConfig}>
            <ResourceOverview.ListItem>
                {(chargingStation: ChargingStation, cardListItemProps: CardListItemProps) => (
                    <CardListItem {...cardListItemProps}>
                        <ChargingStationListItem chargingStation={chargingStation} />
                    </CardListItem>
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(chargingStation: ChargingStation) => <ChargingStationPreview chargingStation={chargingStation} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Add>{CreateChargingStation}</ResourceOverview.Add>
            <ResourceOverview.Edit>{EditChargingStation}</ResourceOverview.Edit>
        </ResourceOverview>
    );
};
