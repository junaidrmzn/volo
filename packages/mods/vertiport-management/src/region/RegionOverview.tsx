import React from "react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { BulkEditForm, RenderEditHandlerProps, ResourceOverview } from "@voloiq/resource-overview";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { CreateRegion } from "./create/CreateRegion";
import { EditRegion } from "./edit/EditRegion";
import { RegionListItem } from "./list/RegionListItem";
import { RegionPreview } from "./preview/RegionPreview";
import { useRegionMachineConfig } from "./useRegionMachineConfig";

export const RegionOverview = () => {
    const { config } = useRegionMachineConfig();

    return (
        <ResourceOverview<Region> machineConfig={config}>
            <ResourceOverview.ListItem>
                {(region: Region, cardListItemProps: CardListItemProps) => (
                    <RegionListItem region={region} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(region: Region) => <RegionPreview region={region} />}</ResourceOverview.Preview>

            <ResourceOverview.Add>{CreateRegion}</ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<Region>) => <EditRegion {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
        </ResourceOverview>
    );
};
