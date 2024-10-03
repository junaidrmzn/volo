import { usePatchService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { Mission } from "../apiModel";
import { CancelMissionRequest } from "./apiModel";

export type UseCancelMissionOptions = {
    missionId: string;
};

export const useCancelMission = (options: UseCancelMissionOptions) => {
    const { missionId } = options;
    return usePatchService<CancelMissionRequest, Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/cancel`,
    });
};
