import { useCreateService } from "@voloiq/service";
import type { FlightTestOrderInsert } from "../../v1/flight-test-orders/apiModels";
import type { FlightTestOrder } from "./apiModels";

export const useAddFlightTestOrder = () => {
    const { sendRequest } = useCreateService<FlightTestOrderInsert, FlightTestOrder>({
        route: "ftd/v2/orders",
    });

    return { addFlightTestOrder: sendRequest };
};
