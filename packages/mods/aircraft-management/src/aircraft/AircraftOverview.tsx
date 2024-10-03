import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { LoadingPage } from "@voloiq/aircraft-management-components";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { BulkEditForm, RenderEditHandlerProps, ResourceOverview } from "@voloiq/resource-overview";
import { AircraftCreate } from "./create/AircraftCreate";
import { AircraftDetail } from "./detail/AircraftDetail";
import { AircraftEdit } from "./edit/AircraftEdit";
import { AircraftListItem } from "./list/aircraft-list-item/AircraftListItem";
import { AircraftPreview } from "./preview/AircraftPreview";
import { useAircraftMachineConfig } from "./useAircraftMachineConfig";

export const AircraftOverview = () => {
    const { config, isLoadingAircraftType, isLoadingVertiport } = useAircraftMachineConfig();
    if (isLoadingAircraftType || isLoadingVertiport) return <LoadingPage />;
    return (
        <ResourceOverview<Aircraft> machineConfig={config}>
            <ResourceOverview.ListItem>
                {(aircraft: Aircraft, cardListItemProps: CardListItemProps) => (
                    <AircraftListItem aircraft={aircraft} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(aircraft: Aircraft) => <AircraftPreview aircraft={aircraft} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Details>
                {(aircraft: Aircraft) => <AircraftDetail aircraft={aircraft} />}
            </ResourceOverview.Details>
            <ResourceOverview.Add>{AircraftCreate}</ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<Aircraft>) => <AircraftEdit {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
        </ResourceOverview>
    );
};
