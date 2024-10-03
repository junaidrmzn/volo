import { ServiceParameters, useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import type { AircraftAssignment } from "./apiModels";

export type UseGetAllScheduledMissionsOptions = {
    scheduledDate: string;
    manual?: boolean;
    params?: ServiceParameters;
};

export const useGetAllScheduledMissions = (options: UseGetAllScheduledMissionsOptions) => {
    const { scheduledDate, manual = false, params } = options;

    const { data, state } = useGetAllService<AircraftAssignment>({
        route: `${networkSchedulingManagementBaseUrl}/missions/schedule/${scheduledDate}`,
        options: { manual },
        params,
    });

    return { data, state };
};
