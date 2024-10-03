import type { CrewMemberAssignmentCreate, MissionAssignment } from "@voloiq-typescript-api/network-scheduling-types";
import type { ServiceOptions } from "@voloiq/service";
import { useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseAssignCrewOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useAssignCrew = (options: UseAssignCrewOptions) => {
    const { missionId, ...serviceOptions } = options;

    return useUpdateService<CrewMemberAssignmentCreate, MissionAssignment>({
        route: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/crew`,
        ...serviceOptions,
    });
};
