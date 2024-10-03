import { Icon, useDisclosure } from "@volocopter/design-library-react";
import { AircraftType, useGetProductLinesQuery } from "@voloiq/aircraft-management-api/v1";
import { LoadingPage } from "@voloiq/aircraft-management-components";
import type { CardListItemProps } from "@voloiq/card-list-item";
import {
    BulkEditForm,
    RenderAddHandlerProps,
    RenderEditHandlerProps,
    ResourceOverview,
} from "@voloiq/resource-overview";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { CreateAircraftType } from "./create/CreateAircraftType";
import { DeleteAircraftType } from "./delete/DeleteAircraftType";
import { AircraftTypeDetail } from "./detail/AircraftTypeDetail";
import { EditAircraftType } from "./edit/EditAircraftType";
import { AircraftTypeListItem } from "./list/AircraftTypeListItem";
import { AircraftTypePreview } from "./preview/AircraftTypePreview";
import { useAircraftTypeMachineConfig } from "./useAircraftTypeMachineConfig";

export const AircraftTypeOverview = () => {
    const { machineConfig } = useAircraftTypeMachineConfig();
    const { t } = useResourcesTranslation();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isLoadingProductLines } = useGetProductLinesQuery();

    if (isLoadingProductLines) return <LoadingPage />;

    return (
        <ResourceOverview<AircraftType> machineConfig={machineConfig}>
            <ResourceOverview.ListItem>
                {(aircraftType: AircraftType, cardListItemProps: CardListItemProps) => (
                    <AircraftTypeListItem aircraftType={aircraftType} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(aircraftType: AircraftType) => <AircraftTypePreview aircraftType={aircraftType} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <CreateAircraftType {...props} />}
            </ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<AircraftType>) => <EditAircraftType {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
            <ResourceOverview.Details>
                {(aircraftType: AircraftType) => <AircraftTypeDetail aircraftType={aircraftType} />}
            </ResourceOverview.Details>
            <ResourceOverview.PreviewActionButtons>
                {(aircraftType: AircraftType) => (
                    <>
                        <ResourceOverview.PreviewActionButton
                            variant="ghost"
                            icon={<Icon icon="delete" />}
                            onClick={onOpen}
                        >
                            {t("generic.delete button")}
                        </ResourceOverview.PreviewActionButton>
                        <DeleteAircraftType
                            id={aircraftType.id || "-1"}
                            aircraftTypeData={aircraftType}
                            entityId={aircraftType?.name}
                            entityName={t("aircraft-type.delete.entityName")}
                            handleStatusNotification={false}
                            onClose={onClose}
                            isOpen={isOpen}
                        />
                    </>
                )}
            </ResourceOverview.PreviewActionButtons>
        </ResourceOverview>
    );
};
