import { MissionAssignment } from "@voloiq-typescript-api/network-scheduling-types";
import { ServiceOptions, useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseUnAssignAircraftOptions = Partial<ServiceOptions> & {
    missionId: string;
};

export const useUnassignAircraft = (options: UseUnAssignAircraftOptions) => {
    const { missionId } = options;
    return useUpdateService<{}, MissionAssignment>({
        route: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/aircraft/unassign`,
        options: {
            manual: true,
        },
        ...options,
    });
};
