import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import type { FlightTestCrew } from "./apiModels";

export type UseGetAllFlightTestCrewOptions = {
    flightTestOrderId: string;
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetAllFlightTestCrew = (options: UseGetAllFlightTestCrewOptions) => {
    const { flightTestOrderId, serviceOptions } = options;

    const { sendRequestWithResponseEnvelope: getAllFlightTestCrew } = useGetAllService<FlightTestCrew>({
        route: `/ftd/v1/orders/${flightTestOrderId}/crew`,
        ...serviceOptions,
    });

    return { getAllFlightTestCrew };
};
