import type { ServiceOptions } from "@voloiq/service";
import { usePatchService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { Mission } from "./apiModel";

export type UseAcceptMissionOptions = Partial<ServiceOptions> & {
    missionId: string;
};

export const useAcceptMission = (options: UseAcceptMissionOptions) => {
    const { missionId } = options;
    return usePatchService<{}, Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/accept-airline`,
        ...options,
    });
};
