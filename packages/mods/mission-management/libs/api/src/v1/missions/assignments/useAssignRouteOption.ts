import type { ServiceOptions } from "@voloiq/service";
import { useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseAssignRouteOptionOptions = Partial<ServiceOptions> & {
    missionId: string;
    routeOptionId?: string;
};
export const useAssignRouteOption = (options: UseAssignRouteOptionOptions) => {
    const { missionId, routeOptionId, ...serviceOptions } = options;
    return useUpdateService({
        route: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/route-option/${routeOptionId}`,
        ...serviceOptions,
    });
};
