import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { Aircraft } from "./apiModels";

export type UseGetAllAvailableAircraftOptions = Partial<ServiceOptions> & {
    missionId: string;
};
export const useGetAllAvailableAircraft = (options: UseGetAllAvailableAircraftOptions) => {
    const { missionId, ...serviceOptions } = options;
    return useGetAllService<Aircraft>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/availability/aircraft`,
        ...serviceOptions,
    });
};
