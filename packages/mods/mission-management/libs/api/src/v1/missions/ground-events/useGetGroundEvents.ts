import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { GroundEvent } from "./apiModels";

export type UseGetGroundEventsOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useGetGroundEvents = (options: UseGetGroundEventsOptions) => {
    const { missionId, ...serviceOptions } = options;
    return useGetAllService<GroundEvent>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/ground-events`,
        ...serviceOptions,
    });
};
