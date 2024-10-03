import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { Mission } from "./apiModel";

export type UseGetAllMissionsOptions = Partial<ServiceOptions>;
export const useGetAllMissions = (options: UseGetAllMissionsOptions = {}) => {
    return useGetAllService<Mission>({
        route: `${networkSchedulingManagementBaseUrl}/missions`,
        ...options,
    });
};
