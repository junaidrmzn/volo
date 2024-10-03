import { useGetAllService } from "@voloiq/service";
import type { FlightTestOrder } from "./apiModels";

export const useGetAllFlightTestOrders = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllService<FlightTestOrder>({
        route: "ftd/v1/orders",
        options: {
            manual: true,
        },
    });

    return { getAllFlightTestOrders: sendRequestWithResponseEnvelope };
};
