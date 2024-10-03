import { Plan, ScheduleItem } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceOverview } from "@voloiq/resource-overview";
import { ScheduleItemListItem } from "./list/ScheduleItemListItem";
import { useScheduleItemMachineConfig } from "./useScheduleItemMachineConfig";

export type ScheduleOverviewProps = {
    plan: Plan;
};

export const ScheduleItemOverview = (props: ScheduleOverviewProps) => {
    const { plan } = props;
    const { commercialSchedule, planName } = plan;
    const scheduleId = commercialSchedule?.id ?? "-1";
    const { scheduleItemMachineConfig } = useScheduleItemMachineConfig({
        scheduleId,
        scheduleStatus: commercialSchedule.status,
        planName,
    });

    return (
        <ResourceOverview<ScheduleItem> machineConfig={scheduleItemMachineConfig}>
            <ResourceOverview.ActionBar />
            <ResourceOverview.ListItem>
                {(scheduleItem: ScheduleItem) => <ScheduleItemListItem scheduleItem={scheduleItem} />}
            </ResourceOverview.ListItem>
        </ResourceOverview>
    );
};
