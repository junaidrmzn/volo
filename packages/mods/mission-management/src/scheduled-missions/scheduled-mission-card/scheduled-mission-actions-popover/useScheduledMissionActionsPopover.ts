import { useGetMission } from "@voloiq/network-schedule-management-api/v1";

export type UseScheduledMissionActionsPopover = {
    missionId: string;
    manual?: boolean;
};

export const useScheduledMissionActionsPopover = (options: UseScheduledMissionActionsPopover) => {
    const { missionId, manual = false } = options;
    return useGetMission({ missionId, manual });
};
