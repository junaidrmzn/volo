import React from "react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { BulkEditForm, RenderEditHandlerProps, ResourceOverview } from "@voloiq/resource-overview";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { LoadingPage } from "@voloiq/vertiport-management-components";
import { CreateVertiport } from "./create/CreateVertiport";
import { VertiportDetail } from "./detail/VertiportDetail";
import { EditVertiport } from "./edit/EditVertiport";
import { VertiportListItem } from "./list/VertiportListItem";
import { VertiportPreview } from "./preview/VertiportPreview";
import { useVertiportMachineConfig } from "./useVertiportMachineConfig";

export const VertiportOverview = () => {
    const { config, isLoadingRegion, isLoadingService } = useVertiportMachineConfig();
    if (isLoadingRegion || isLoadingService) return <LoadingPage />;
    return (
        <ResourceOverview<Vertiport> machineConfig={config}>
            <ResourceOverview.ListItem>
                {(vertiport: Vertiport, cardListItemProps: CardListItemProps) => (
                    <VertiportListItem vertiport={vertiport} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Details>
                {(vertiport: Vertiport) => <VertiportDetail vertiport={vertiport} />}
            </ResourceOverview.Details>
            <ResourceOverview.Preview>
                {(vertiport: Vertiport) => <VertiportPreview vertiport={vertiport} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Add>{CreateVertiport}</ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<Vertiport>) => <EditVertiport {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
        </ResourceOverview>
    );
};
