import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import type { RenderAddHandlerProps, RenderEditHandlerProps } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { CreateCrewRole } from "./create/CreateCrewRole";
import { EditCrewRole } from "./edit/EditCrewRole";
import { CrewRoleListItem } from "./list/CrewRoleListItem";
import { CrewRolePreview } from "./preview/CrewRolePreview";
import { useCrewRoleMachineConfig } from "./useCrewRoleMachineConfig";

export const CrewRoleOverview = () => {
    const { config } = useCrewRoleMachineConfig();

    return (
        <ResourceOverview<CrewRole> machineConfig={config}>
            <ResourceOverview.ListItem>
                {(crewRole: CrewRole, cardListItemProps: CardListItemProps) => (
                    <CrewRoleListItem crewRole={crewRole} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <CreateCrewRole {...props} />}
            </ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<CrewRole>) => <EditCrewRole {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.Preview>
                {(crewRole: CrewRole) => <CrewRolePreview crewRole={crewRole} />}
            </ResourceOverview.Preview>
        </ResourceOverview>
    );
};
