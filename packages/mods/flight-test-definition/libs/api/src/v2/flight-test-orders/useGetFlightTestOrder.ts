import type { ServiceOptions } from "@voloiq/service";
import { useGetService } from "@voloiq/service";
import type { FlightTestOrder } from "./apiModels";

export type UseGetFlightTestOrderOptions = {
    flightTestOrderId: string;
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetFlightTestOrder = (options: UseGetFlightTestOrderOptions) => {
    const { flightTestOrderId, serviceOptions } = options;
    const { data: FlightTestOrder, refetchData: getFlightTestOrder } = useGetService<FlightTestOrder>({
        route: "ftd/v2/orders",
        resourceId: flightTestOrderId,
        ...serviceOptions,
    });

    return { FlightTestOrder, getFlightTestOrder };
};
