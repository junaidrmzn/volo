import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useGetService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";

export type UseGetMissionOptions = {
    missionId: string;
    manual?: boolean;
};

export const useGetMission = (options: UseGetMissionOptions) => {
    const { missionId, manual = false } = options;
    return useGetService<Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions`,
        resourceId: missionId,
        options: {
            manual,
        },
    });
};
