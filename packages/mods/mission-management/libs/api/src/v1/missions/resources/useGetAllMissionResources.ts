import type { MissionResource } from "@voloiq-typescript-api/network-scheduling-types";
import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseGetAllMissionResourcesOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useGetAllMissionResources = (options: UseGetAllMissionResourcesOptions) => {
    const { missionId, ...serviceOptions } = options;
    return useGetAllService<MissionResource>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/resources`,
        ...serviceOptions,
    });
};
