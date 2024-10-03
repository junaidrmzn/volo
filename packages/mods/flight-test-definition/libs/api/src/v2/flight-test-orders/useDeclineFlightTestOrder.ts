import { useCreateService } from "@voloiq/service";

export type UseDeclineFlightTestOrderOptions = {
    flightTestOrderId: string;
};

export const useDeclineFlightTestOrder = (options: UseDeclineFlightTestOrderOptions) => {
    const { flightTestOrderId } = options;
    const { sendRequest } = useCreateService({
        route: `ftd/v2/orders/${flightTestOrderId}/decline`,
    });

    return { sendRequest };
};
