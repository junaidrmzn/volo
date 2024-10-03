import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import type { RenderAddHandlerProps, RenderEditHandlerProps, ResourcePreviewOptions } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { ParameterListItem } from "./ParameterListItem";
import { ParameterStatusUpdateButton } from "./ParameterStatusUpdateButton";
import { AddParameterForm } from "./add-parameter/AddParameterForm";
import { EditParameterForm } from "./edit-parameter/EditParameterForm";
import { useParameterMachineConfig } from "./parameter-machine-config/useParameterMachineConfig";
import { ParameterPreview } from "./parameter-preview/ParameterPreview";

export const ParameterOverview = () => {
    const { parameterMachineConfig } = useParameterMachineConfig();
    return (
        <ResourceOverview machineConfig={parameterMachineConfig}>
            <ResourceOverview.ListItem>
                {(parameter: TestPointParameter, cardListItemProps: CardListItemProps) => (
                    <ParameterListItem parameter={parameter} cardListItemProps={cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <AddParameterForm {...props} />}
            </ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<TestPointParameter>) => <EditParameterForm {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.Preview>
                {(parameter: TestPointParameter) => <ParameterPreview parameter={parameter} />}
            </ResourceOverview.Preview>
            <ResourceOverview.PreviewActionButtons>
                {(parameter: TestPointParameter, options: ResourcePreviewOptions) => (
                    <ParameterStatusUpdateButton
                        reloadOverview={() => {
                            options.reloadList();
                            options.reloadPreview();
                        }}
                        parameter={parameter}
                    />
                )}
            </ResourceOverview.PreviewActionButtons>
        </ResourceOverview>
    );
};
