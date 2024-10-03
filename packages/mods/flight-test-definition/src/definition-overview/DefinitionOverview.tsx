import { FlightTestDefinitionOverviewListResponseBody } from "@voloiq/flight-test-definition-api/v2";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { AddDefinitionForm } from "./add-definition/AddDefinitionForm";
import { AtaStack } from "./ata-stack/AtaStack";
import { useDefinitionMachineConfig } from "./definition-machine-config/useDefinitionMachineConfig";

export const DefinitionOverview = () => {
    const { definitionMachineConfig } = useDefinitionMachineConfig();

    return (
        <ResourceOverview machineConfig={definitionMachineConfig}>
            <ResourceOverview.ListItem>
                {(definitionList: FlightTestDefinitionOverviewListResponseBody) => (
                    <AtaStack definitionList={definitionList} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <AddDefinitionForm {...props} />}
            </ResourceOverview.Add>
        </ResourceOverview>
    );
};
