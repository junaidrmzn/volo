import { useCreateService } from "@voloiq/service";
import { FlightTestOrder } from "./apiModels";

export type UseFlightTestOrderExecuteProps = {
    flightTestOrderId: string;
};

export const useFlightTestOrderExecute = (props: UseFlightTestOrderExecuteProps) => {
    const { flightTestOrderId } = props;
    const { sendRequest } = useCreateService<{}, FlightTestOrder>({
        route: `/ftd/v1/orders/${flightTestOrderId}/execute`,
    });

    return { flightTestOrderExecute: sendRequest };
};
