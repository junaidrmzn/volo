import { useCreateService } from "@voloiq/service";
import type { FlightTestOrder, FlightTestOrderInsert } from "./apiModels";

export const useAddFlightTestOrder = () => {
    const { sendRequest } = useCreateService<FlightTestOrderInsert, FlightTestOrder>({
        route: "ftd/v1/orders",
    });

    return { addFlightTestOrder: sendRequest };
};
