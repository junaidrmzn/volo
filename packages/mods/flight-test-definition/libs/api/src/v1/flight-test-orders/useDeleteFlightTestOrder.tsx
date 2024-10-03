import { useCallback } from "react";
import { useDeleteService } from "@voloiq/service";
import { FlightTestOrder } from "./apiModels";

export const useDeleteFlightTestOrder = () => {
    const { sendRequest } = useDeleteService<FlightTestOrder>({
        route: "",
        options: {
            manual: true,
        },
    });

    const deleteFlightTestOrder = useCallback(
        async (flightTestOrderId: string) => {
            await sendRequest({
                url: `/ftd/v1/orders/${flightTestOrderId}`,
            });
        },
        [sendRequest]
    );

    return { deleteFlightTestOrder };
};
