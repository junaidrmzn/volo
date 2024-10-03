import type { CardListItemProps } from "@voloiq/card-list-item";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { LoadingPage } from "@voloiq/network-scheduling-components";
import {
    BulkEditForm,
    RenderAddHandlerProps,
    ResourceListItemOptions,
    ResourceOverview,
} from "@voloiq/resource-overview";
import { AddMissionForm } from "./mission-creation/MissionAdd";
import { MissionListItem } from "./mission-list-item/MissionListItem";
import { useExpandedItems } from "./useExpandedItems";
import { useMissionMachineConfig } from "./useMissionMachineConfig";

type MissionOverviewProps = {
    pollingInterval?: number;
};

export const MissionOverview = (props: MissionOverviewProps) => {
    const { pollingInterval = 30_000 } = props;
    const { missionMachineConfig, isLoadingAircraft, isLoadingAircraftType } = useMissionMachineConfig(pollingInterval);
    const { expandedItems, setExpandedItems } = useExpandedItems();
    if (isLoadingAircraft || isLoadingAircraftType) return <LoadingPage />;
    return (
        <ResourceOverview machineConfig={missionMachineConfig}>
            <ResourceOverview.ListItem>
                {(mission: Mission, _: CardListItemProps, options: ResourceListItemOptions) => (
                    <MissionListItem
                        mission={mission}
                        onReloadList={() => {
                            options.reloadList();
                        }}
                        onExpandItem={setExpandedItems}
                        expandedItems={expandedItems}
                    />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Add>
                {(props: RenderAddHandlerProps) => <AddMissionForm {...props} />}
            </ResourceOverview.Add>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
        </ResourceOverview>
    );
};
