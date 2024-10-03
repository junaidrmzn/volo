import type { ServiceOptions } from "@voloiq/service";
import { usePatchService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import type { Mission, MissionEstimatedDateTimes } from "./apiModel";

export type UseUpdateMissionOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useUpdateMission = (options: UseUpdateMissionOptions) => {
    const { missionId, ...serviceOptions } = options;
    return usePatchService<MissionEstimatedDateTimes, Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/delay`,
        ...serviceOptions,
    });
};
