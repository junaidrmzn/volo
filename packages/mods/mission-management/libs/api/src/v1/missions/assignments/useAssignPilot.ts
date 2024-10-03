import type { MissionAssignment } from "@voloiq-typescript-api/network-scheduling-types";
import type { ServiceOptions } from "@voloiq/service";
import { useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseAssignPilotOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useAssignPilot = (options: UseAssignPilotOptions) => {
    const { missionId } = options;
    return useUpdateService<{}, MissionAssignment>({
        route: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/pilot`,
        ...options,
    });
};
