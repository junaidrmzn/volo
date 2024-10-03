import { CardListItemProps } from "@voloiq/card-list-item";
import { Connection } from "@voloiq/commercial-scheduling-api/v1";
import { LoadingPage } from "@voloiq/commercial-scheduling-components";
import { RenderAddHandlerProps, RenderEditHandlerProps, ResourceOverview } from "@voloiq/resource-overview";
import { AddConnection } from "./add/AddConnection";
import { EditConnection } from "./edit/EditConnection";
import { ConnectionListItem } from "./list/ConnectionListItem";
import { ConnectionPreview } from "./preview/ConnectionPreview";
import { useConnectionMachineConfig } from "./useConnectionMachineConfig";

export const ConnectionOverview = () => {
    const { connectionMachineConfig, isLoading } = useConnectionMachineConfig();

    if (isLoading) return <LoadingPage />;
    return (
        <ResourceOverview<Connection> machineConfig={connectionMachineConfig}>
            <ResourceOverview.ListItem>
                {(connection: Connection, cardListItemProps: CardListItemProps) => (
                    <ConnectionListItem connection={connection} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(connection: Connection) => <ConnectionPreview connection={connection} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <AddConnection {...props} />}
            </ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<Connection>) => <EditConnection {...props} />}
            </ResourceOverview.Edit>
        </ResourceOverview>
    );
};
