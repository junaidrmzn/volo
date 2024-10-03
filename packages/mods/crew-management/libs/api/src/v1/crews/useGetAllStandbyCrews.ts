import { CrewMember } from "@voloiq-typescript-api/crew-api-types";
import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";

export type UseGetAllStandbyCrewsOptions = Partial<ServiceOptions> & {
    scheduleDate: string;
    aircraftTypeId: string;
    regionId?: string;
};

export const useGetAllStandbyCrews = (options: UseGetAllStandbyCrewsOptions) => {
    const { scheduleDate, aircraftTypeId, regionId, ...serviceOptions } = options;
    const { data, state, sendRequest } = useGetAllService<CrewMember>({
        route: `${crewManagementBaseUrl}/crews/standby/${regionId}/${aircraftTypeId}/${scheduleDate}`,
        options: {
            manual: true,
            ...serviceOptions,
        },
    });

    return { data, state, sendRequest };
};
