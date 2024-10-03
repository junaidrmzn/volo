import type { RouteOption } from "@voloiq-typescript-api/network-scheduling-types";
import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export const useGetAllRouteOptions = (missionId: string) =>
    useGetAllService<RouteOption>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/route-options`,
    });
