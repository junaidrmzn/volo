import type { Mission, MissionCreate } from "@voloiq-typescript-api/network-scheduling-types";
import { useCreateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";

export const useAddMission = () => {
    return useCreateService<MissionCreate, Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions`,
    });
};
