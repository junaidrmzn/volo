import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import type { FlightTestOrder } from "./apiModels";

export type UseGetAllFlightTestOrdersOptions = {
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetAllFlightTestOrders = (options: UseGetAllFlightTestOrdersOptions = {}) => {
    const { serviceOptions } = options;

    const { sendRequestWithResponseEnvelope } = useGetAllService<FlightTestOrder>({
        route: "ftd/v2/orders",
        ...serviceOptions,
    });

    return { getAllFlightTestOrders: sendRequestWithResponseEnvelope };
};
