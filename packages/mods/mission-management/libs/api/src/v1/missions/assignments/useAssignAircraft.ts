import type { MissionAssignment } from "@voloiq-typescript-api/network-scheduling-types";
import type { ServiceOptions } from "@voloiq/service";
import { useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseAssignAircraftOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useAssignAircraft = (options: UseAssignAircraftOptions) => {
    const { missionId } = options;
    return useUpdateService<{}, MissionAssignment>({
        route: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/aircraft`,
        ...options,
    });
};
