import type { CrewMember, CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { LoadingPage } from "@voloiq/crew-management-components";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { RenderAddHandlerProps, RenderEditHandlerProps } from "@voloiq/resource-overview";
import { BulkEditForm, ResourceOverview } from "@voloiq/resource-overview";
import { CreateCrewMember } from "./create/CreateCrewMember";
import { CrewMemberDetail } from "./detail/CrewMemberDetail";
import { CrewMemberDetailOld } from "./detail/CrewMemberDetailOld";
import { EditCrewMember } from "./edit/EditCrewMember";
import { CrewMemberListItem } from "./list/CrewMemberListItem";
import { CrewMemberPreview } from "./preview/CrewMemberPreview";
import { useCrewMemberMachineConfig } from "./useCrewMemberMachineConfig";

export const CrewMemberOverview = () => {
    const { config, isLoadingRegion, isLoadingCrewRoles } = useCrewMemberMachineConfig();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    if (isLoadingRegion || isLoadingCrewRoles) return <LoadingPage />;
    return (
        <ResourceOverview<CrewMember> machineConfig={config}>
            <ResourceOverview.ListItem>
                {(crewMember: CrewMemberWithNames, cardListItemProps: CardListItemProps) => (
                    <CrewMemberListItem crewMember={crewMember} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <CreateCrewMember {...props} />}
            </ResourceOverview.Add>
            <ResourceOverview.Details>
                {(crewMember: CrewMemberWithNames) =>
                    isFeatureFlagEnabled("vao-1889-timegrid-2.0") ? (
                        <CrewMemberDetail crewMember={crewMember} />
                    ) : (
                        <CrewMemberDetailOld crewMember={crewMember} />
                    )
                }
            </ResourceOverview.Details>
            <ResourceOverview.Preview>
                {(crewMember: CrewMemberWithNames) => <CrewMemberPreview crewMember={crewMember} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<CrewMember>) => <EditCrewMember {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
        </ResourceOverview>
    );
};
