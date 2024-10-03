import { ServiceOptions, useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { MissionAssignment } from "../apiModel";

export type UseAssignPadOptions = Partial<ServiceOptions> & {
    missionId: string;
};

export const useAssignPad = (options: UseAssignPadOptions) => {
    const { missionId } = options;
    return useUpdateService<{}, MissionAssignment>({
        route: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/vertiport`,
        ...options,
    });
};
