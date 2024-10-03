import { useCreateService } from "@voloiq/service";
import { FlightTestOrder } from "./apiModels";

export type UseFlightTestOrderApproveProps = {
    flightTestOrderId: string;
};

export const useFlightTestOrderApprove = (props: UseFlightTestOrderApproveProps) => {
    const { flightTestOrderId } = props;
    const { sendRequest } = useCreateService<{}, FlightTestOrder>({
        route: `/ftd/v1/orders/${flightTestOrderId}/approve`,
    });

    return { flightTestOrderApprove: sendRequest };
};
