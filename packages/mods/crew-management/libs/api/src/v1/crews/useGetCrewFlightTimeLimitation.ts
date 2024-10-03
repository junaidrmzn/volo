import { ServiceOptions, useGetService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";
import { FlightTimeLimitation } from "./apiModels";

export type UseGetCrewFlightTimeLimitationOptions = Partial<ServiceOptions> & {
    scheduleDate: string;
    crewId: string;
};

export const useGetCrewFlightTimeLimitation = (options: UseGetCrewFlightTimeLimitationOptions) => {
    const { scheduleDate, crewId } = options;
    const { data, state } = useGetService<FlightTimeLimitation>({
        route: `${crewManagementBaseUrl}/crew-management`,
        resourceId: `${crewId}/ftl/${scheduleDate}`,
    });

    return { data, state };
};
