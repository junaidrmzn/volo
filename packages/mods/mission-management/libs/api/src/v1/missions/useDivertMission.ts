import type { Mission, MissionDivert } from "@voloiq-typescript-api/network-scheduling-types";
import { usePatchService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";

export const useDivertMission = (missionId: string) =>
    usePatchService<MissionDivert, Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/divert`,
    });
